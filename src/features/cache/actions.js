// @flow
import { createAction } from "redux-actions";

import {
  CACHE_AUDIO_LIST,
  CACHE_AUDIO_LIST_SUCCESS,
  CACHE_AUDIO_LIST_FAILED,
  CACHE_AUDIO_LIST_ONE_TRACK_ERROR,
  CACHE_AUDIO_LIST_ONE_TRACK_SUCCESS,
  DELETE_CACHE_AUDIO_LIST_TASK,
  SYNC_MY_AUDIOS_CACHE_SUCCESS,
  CACHE_TRACK_SUCCESS
} from "./actionTypes";

import { createHash } from "../../utils/hash";

export const cacheTrackSuccess = createAction(
  CACHE_TRACK_SUCCESS,
  (v: {| trackId: string, trackUrl: string |}) => v
);

export const syncCacheSuccess = createAction(
  SYNC_MY_AUDIOS_CACHE_SUCCESS,
  (v: { [id: string]: string }) => v
);

export const cacheAudioList = createAction(
  CACHE_AUDIO_LIST,
  (ids: Array<string>) => ids,
  (ids: Array<string>) => ({ taskId: createHash(ids.join()) })
);

export const cacheAudioListSuccess = createAction(
  CACHE_AUDIO_LIST_SUCCESS,
  (taskId: string) => taskId
);

export const cacheAudioListFailed = createAction(
  CACHE_AUDIO_LIST_FAILED,
  (taskId: string) => taskId
);

export const deleteCacheAudioListTask = createAction(
  DELETE_CACHE_AUDIO_LIST_TASK,
  (taskId: string) => taskId
);

export const cacheAudioListTrackError = createAction(
  CACHE_AUDIO_LIST_ONE_TRACK_ERROR,
  (v: {| taskId: string, trackId: string |}) => v
);
export const cacheAudioListTrackSuccess = createAction(
  CACHE_AUDIO_LIST_ONE_TRACK_SUCCESS,
  (v: {| taskId: string, trackId: string |}) => v
);
