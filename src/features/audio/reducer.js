// @flow
import { assocPath, concat, pipe, T, uniq } from "ramda";
import { combineReducers } from "redux";
import { handleAction, handleActions } from "redux-actions";

import {
  FETCH_ALL_MY_AUDIO_SUCCESS,
  INITIAL_FETCH_MY_AUDIO_SUCCESS
} from "./actionTypes";
import {
  ITUNES_IMAGE_NOT_FOUND,
  UPDATE_TRACK_IMAGE
} from "../itunes/actionTypes";

import { FEATURE_NAME } from "./consts/index";
import { createOnFetchSuccessReducer } from "./utils";

const ids = handleActions(
  {
    [FETCH_ALL_MY_AUDIO_SUCCESS]: (_, { payload: { playlistIds } }) =>
      playlistIds,
    [INITIAL_FETCH_MY_AUDIO_SUCCESS]: (state, { payload: { playlistIds } }) =>
      uniq(concat(playlistIds, state))
  },
  []
);

const byId = handleActions(
  {
    [INITIAL_FETCH_MY_AUDIO_SUCCESS]: createOnFetchSuccessReducer(T),
    [FETCH_ALL_MY_AUDIO_SUCCESS]: createOnFetchSuccessReducer(
      (stateTrackId, _, action) =>
        action.payload.playlistIds.includes(stateTrackId)
    ),

    [UPDATE_TRACK_IMAGE]: (state, { payload: { uri, trackId, smallUri } }) =>
      pipe(
        assocPath([trackId, "itunes", "artwork"], { uri }),
        assocPath([trackId, "imageSource"], { uri: smallUri })
      )(state),

    [ITUNES_IMAGE_NOT_FOUND]: (state, { payload: trackId }) =>
      pipe(assocPath([trackId, "itunes"], { notFound: true }))(state)
  },
  {}
);

export default {
  [FEATURE_NAME]: combineReducers({
    ids,
    byId
  })
};
