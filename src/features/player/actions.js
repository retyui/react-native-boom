// @flow
import { createAction } from "redux-actions";

import {
  PLAYER_PAUSE,
  PLAYER_PLAY,
  PLAYER_STOP,
  PLAYER_PLAY_TRACK,
  PLAYER_NEXT,
  PLAYER_PREV,
  PLAYBACK_CHANGE,
  PLAYBACK_END,
  PLAYER_SEEK_TO,
  PLAYBACK_STATE_UPDATE
} from "./actionTypes";

export const playerPause = createAction(PLAYER_PAUSE);
export const playerPlay = createAction(PLAYER_PLAY);
export const playerStop = createAction(PLAYER_STOP);
export const playerNext = createAction(PLAYER_NEXT);
export const playerPrev = createAction(PLAYER_PREV);
export const playerSeekTo = createAction(PLAYER_SEEK_TO);

export const playbackStateUpdate = createAction(PLAYBACK_STATE_UPDATE);
export const playbackChange = createAction(PLAYBACK_CHANGE);
export const playbackEnd = createAction(PLAYBACK_END);

export const playerPlayTrack = createAction(
  PLAYER_PLAY_TRACK,
  (trackIds: Array<string>, trackId: string) => ({
    trackIds,
    trackId
  })
);

export const eventToActionMap = {
  "playback-state": playbackStateUpdate,
  "playback-error": payload => ({ type: "XXXXXXX/playback-error", payload }),
  "playback-queue-ended": playbackEnd,
  "playback-track-changed": playbackChange,

  "remote-play": playerPlay,
  "remote-pause": playerPause,
  "remote-stop": playerStop,
  "remote-next": playerNext,
  "remote-previous": playerPrev,
  "remote-jump-forward": payload => ({
    type: "XXXXXXX/remote-jump-forward",
    payload
  }),
  "remote-jump-backward": payload => ({
    type: "XXXXXXX/remote-jump-backward",
    payload
  }),
  "remote-seek": payload => ({ type: "XXXXXXX/remote-seek", payload }),
  "remote-skip": payload => ({ type: "XXXXXXX/remote-skip", payload }),
  "remote-duck": payload => ({ type: "XXXXXXX/remote-duck", payload }),
  "remote-set-rating": payload => ({
    type: "XXXXXXX/remote-set-rating",
    payload
  }),
  "remote-play-id": payload => ({ type: "XXXXXXX/remote-play-id", payload }),
  "remote-play-search": payload => ({
    type: "XXXXXXX/remote-play-search",
    payload
  })
};
