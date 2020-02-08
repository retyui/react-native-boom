// @flow
import { combineReducers } from "redux";
import { pipe, path } from "ramda";
import { handleAction, handleActions } from "redux-actions";
import tp from "react-native-track-player";

import {
  PLAYBACK_CHANGE,
  PLAYBACK_STATE_UPDATE,
  PLAYER_PLAY_TRACK
} from "./actionTypes";

import { FEATURE_NAME } from "./consts/index";

const mapStateToName = {
  [tp.STATE_NONE]: "none",
  [tp.STATE_PLAYING]: "playing",
  [tp.STATE_PAUSED]: "paused",
  [tp.STATE_STOPPED]: "stopped",
  [tp.STATE_BUFFERING]: "buffering"
};

const currentList = handleAction(
  PLAYER_PLAY_TRACK,
  (_, { payload: { trackIds } }) => trackIds,
  []
);

const currentTrackId = handleActions(
  {
    [PLAYBACK_CHANGE]: (_, { payload: { nextTrack } }) => nextTrack
  },
  null
);

const playbackState = handleAction(
  PLAYBACK_STATE_UPDATE,
  (state, action) =>
    pipe(
      path(["payload", "state"]),
      playerState => mapStateToName[playerState] || state
    )(action),
  "none"
);

export default {
  [FEATURE_NAME]: combineReducers({
    currentList,
    currentTrackId,
    playbackState
  })
};
