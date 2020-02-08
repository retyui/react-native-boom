// @flow
import { assoc, omit, path } from "ramda";
import { combineReducers } from "redux";
import { handleAction, handleActions } from "redux-actions";

import { FEATURE_NAME } from "./consts/index";
import {
  CACHE_AUDIO_LIST,
  CACHE_AUDIO_LIST_ONE_TRACK_ERROR,
  CACHE_AUDIO_LIST_ONE_TRACK_SUCCESS,
  CACHE_TRACK_SUCCESS,
  DELETE_CACHE_AUDIO_LIST_TASK,
  SYNC_MY_AUDIOS_CACHE_SUCCESS
} from "./actionTypes";
import { createAppender } from "./utils";

const addErrorId = createAppender("errorIds");
const addReadyId = createAppender("readyIds");

const tasks = handleActions(
  {
    [CACHE_AUDIO_LIST]: (state, action) =>
      assoc(
        path(["meta", "taskId"], action),
        {
          queue: path(["payload"], action),
          errorIds: [],
          readyIds: []
        },
        state
      ),
    [DELETE_CACHE_AUDIO_LIST_TASK]: (state, { payload: taskId }) =>
      omit([taskId], state),
    [CACHE_AUDIO_LIST_ONE_TRACK_ERROR]: addErrorId,
    [CACHE_AUDIO_LIST_ONE_TRACK_SUCCESS]: addReadyId
  },
  {}
);

const myAudioCache = handleActions(
  {
    [SYNC_MY_AUDIOS_CACHE_SUCCESS]: (state, { payload: cacheMap }) => cacheMap,
    [CACHE_TRACK_SUCCESS]: (state, { payload: { trackId, trackUrl } }) => ({
      ...state,
      [trackId]: trackUrl
    })
  },
  {}
);

export default {
  [FEATURE_NAME]: combineReducers({
    tasks,
    myAudioCache
  })
};
