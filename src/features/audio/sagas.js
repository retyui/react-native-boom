// @flow
import { type Saga } from "redux-saga";
import { call, put, select, takeEvery } from "redux-saga/effects";

import createTaskSaga from "../tasks/createSaga";
import { getUserId } from "../currentUser/selectors";
import { APP_STARTED_SUCCESS } from "../app/actionTypes";
import { createErrorBoundary } from "../analytics/sagas";

import {
  fetchAllMyAudioSuccess,
  initialFetchMyAudioSuccess,
  syncMyAudio
} from "./actions";
import { fetchUserAudios } from "./api";
import { SYNC_MY_AUDIO } from "./actionTypes";
import { FetchMyAudiosContext } from "./utils";

import type { ApiMyAudiosResponse } from "./types";

function* fetchAllUserAudio(action): Saga<void> {
  const userId = yield select(getUserId);

  if (userId) {
    const fetchContext = new FetchMyAudiosContext(userId);

    const initialFetchUserAudio = createTaskSaga(
      function*(): Saga<ApiMyAudiosResponse> {
        const initialOffset = 0;
        const result = yield call(fetchUserAudios, userId, initialOffset);

        yield call(fetchContext.appendChunk, result);

        yield put(initialFetchMyAudioSuccess(fetchContext.getData()));

        return result;
      }
    );

    let chunkResponse = yield call(initialFetchUserAudio, action);

    while (FetchMyAudiosContext.isNotEmptyResponse(chunkResponse)) {
      chunkResponse = yield call(
        fetchUserAudios,
        userId,
        fetchContext.getOffset()
      );

      fetchContext.appendChunk(chunkResponse);
    }

    yield put(fetchAllMyAudioSuccess(fetchContext.getData()));
  }
}

function* initialSync(): Saga<void> {
  yield put(syncMyAudio());
}

export default function* rootAudioSaga(): Saga<void> {
  yield takeEvery(APP_STARTED_SUCCESS, createErrorBoundary(initialSync));
  yield takeEvery(SYNC_MY_AUDIO, createErrorBoundary(fetchAllUserAudio));
}
