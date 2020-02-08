// @flow
import { ToastAndroid } from "react-native";

import { buffers, eventChannel, type Saga } from "redux-saga";
import {
  all,
  call,
  cancel,
  fork,
  put,
  select,
  take,
  takeEvery,
  takeLatest
} from "redux-saga/effects";
import { prop, propEq } from "ramda";
import {
  isPermissionGranted,
  requestStoragePermission
} from "../../permission/fs";
import { createErrorBoundary } from "../../analytics/sagas";
import { AUTHORIZE_SUCCESS, DEAUTHORIZE } from "../../auth/actionTypes";
import { makeChunkArray } from "../../../utils/array";
import { downloadFile } from "../../fs/sagas";
import { getAudiosIds, getFileName, getTrackSrc } from "../../audio/selectors";

import {
  cacheAudioListFailed,
  cacheAudioListSuccess,
  cacheAudioListTrackError,
  cacheAudioListTrackSuccess,
  cacheTrackSuccess,
  deleteCacheAudioListTask,
  syncCacheSuccess
} from "../actions";

import {
  CACHE_AUDIO_LIST,
  CACHE_AUDIO_LIST_FAILED,
  CACHE_AUDIO_LIST_SUCCESS
} from "../actionTypes";

import {
  canCacheAudios,
  getAbsolutePathByFileName,
  getAbsoluteUrlByFileName,
  getCachedFiles
} from "./fs";
import { areAllIdsCached, getTaskQueueTracksIds } from "../selectors";
import { APP_STARTED_SUCCESS } from "../../app/actionTypes";
import {
  FETCH_ALL_MY_AUDIO_SUCCESS,
  INITIAL_FETCH_MY_AUDIO_SUCCESS
} from "../../audio/actionTypes";
import { takeBetween } from "../../../utils/saga";
import { UPDATE_STORAGE_PERMISSION } from "../../permission/actionTypes";
import { tryGetStoragePermission } from "../../permission/sagas";

const LIMIT_DOWNLOADS = 3;

function* downloadAudio({
  trackId,
  taskId
}: {
  trackId: string,
  taskId: string
}) {
  try {
    const filename = yield select(getFileName, trackId);
    const fromUrl = yield select(getTrackSrc, trackId);

    const toFile = getAbsolutePathByFileName(filename);

    yield call(downloadFile, {
      id: trackId,
      fromUrl,
      toFile
    });

    yield put(
      cacheTrackSuccess({
        trackId,
        trackUrl: getAbsoluteUrlByFileName(filename)
      })
    );

    yield put(cacheAudioListTrackSuccess({ taskId, trackId }));
  } catch (e) {
    yield put(cacheAudioListTrackError({ taskId, trackId }));
  }
}

function* cacheAudioList({ meta: { taskId } }) {
  try {
    const tracksIds = yield select(getTaskQueueTracksIds, taskId);
    const chunksIds = makeChunkArray(tracksIds, LIMIT_DOWNLOADS);

    for (const chunkIds of chunksIds) {
      yield all(
        chunkIds.map(trackId =>
          call(downloadAudio, {
            taskId,
            trackId
          })
        )
      );
    }

    yield put(cacheAudioListSuccess(taskId));
  } catch (e) {
    yield put(cacheAudioListFailed(taskId));
  }
}

function* onFinishCacheList(action) {
  const taskId = prop("payload", action);

  if (propEq("type", CACHE_AUDIO_LIST_SUCCESS, action)) {
    const allCached = yield select(areAllIdsCached, taskId);

    if (allCached) {
      yield put(deleteCacheAudioListTask(taskId));
    }
  }

  if (propEq("type", CACHE_AUDIO_LIST_FAILED, action)) {
  }
}

export function* bgSyncCache(): Saga<void> {
  const ids = yield select(getAudiosIds);

  if (ids && ids.length) {
    const map = {};
    const files = yield call(getCachedFiles);

    for (const id of ids) {
      const filename = yield select(getFileName, id);

      if (files.includes(filename)) {
        map[id] = getAbsoluteUrlByFileName(filename);
      }
    }

    yield put(syncCacheSuccess(map));
  }
}

function* waitOnGrantedStoragePermission(saga: Function) {
  while (true) {
    const { payload: status } = yield take(UPDATE_STORAGE_PERMISSION);

    if (isPermissionGranted(status)) {
      return yield fork(saga);
    }
  }
}

function* initFs() {
  let taskId = null;

  yield fork(waitOnGrantedStoragePermission, function*() {
    if (taskId) {
      yield cancel(taskId);
    }

    const canCache = yield call(canCacheAudios);

    if (canCache) {
      yield takeLatest(
        [INITIAL_FETCH_MY_AUDIO_SUCCESS, FETCH_ALL_MY_AUDIO_SUCCESS],
        createErrorBoundary(bgSyncCache)
      );

      yield takeEvery(CACHE_AUDIO_LIST, createErrorBoundary(cacheAudioList));
    } else {
      yield takeLatest(CACHE_AUDIO_LIST, function*() {
        yield call(
          ToastAndroid.show,
          "Не удалось инициализировать файловый менеджер.",
          ToastAndroid.SHORT
        );
      });
    }
  });

  yield fork(requestStoragePermission);

  taskId = yield takeEvery(CACHE_AUDIO_LIST, tryGetStoragePermission);
}

export default function* rootCacheSaga(): Saga<void> {
  yield takeBetween(
    [APP_STARTED_SUCCESS, AUTHORIZE_SUCCESS],
    DEAUTHORIZE,
    createErrorBoundary(initFs)
  );

  yield takeEvery(
    [CACHE_AUDIO_LIST_SUCCESS, CACHE_AUDIO_LIST_FAILED],
    createErrorBoundary(onFinishCacheList)
  );
}
