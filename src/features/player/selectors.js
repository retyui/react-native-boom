// @flow
import { equals, findIndex, pipe, prop, identical, allPass } from "ramda";

import { FEATURE_NAME } from "./consts/index";

const getRoot = prop(FEATURE_NAME);

export const getCurrentPlaylist = pipe(
  getRoot,
  prop("currentList")
);

export const getCurrentTrackId = pipe(
  getRoot,
  prop("currentTrackId")
);

export const hasCurrentTrack = pipe(
  getCurrentTrackId,
  Boolean
);

export const isCurrentTrackId = (state: Object, trackId: string) =>
  pipe(
    getCurrentTrackId,
    identical(trackId)
  )(state);

export const isCurrentPlayingTrackId = (state: Object, trackId: string) =>
  allPass([
    pipe(
      getCurrentTrackId,
      identical(trackId)
    ),
    isPlayerPlaying
  ])(state);

const makeSliceSelector = (
  getterFn: (index: number, playlist: Array<string>) => string
) => (state: Object) => {
  const current = getCurrentTrackId(state);
  const playlist = getCurrentPlaylist(state);

  const index = findIndex(equals(current))(playlist);

  if (index !== -1) {
    return getterFn(index, playlist);
  }

  return null;
};

export const getNextOrFirstTrackId = makeSliceSelector(
  (index, playlist) => playlist[index + 1] || playlist[0]
);
export const getPrevOrLastTrackId = makeSliceSelector(
  (index, playlist) => playlist[index - 1] || playlist[playlist.length - 1]
);

export const isLastTrackId = (state: Object, trackId?: string): boolean => {
  const current = trackId || getCurrentTrackId(state);
  const playlist = getCurrentPlaylist(state);

  return playlist[playlist.length - 1] === current;
};
export const isFirstTrackId = (state: Object, trackId?: string): boolean => {
  const current = trackId || getCurrentTrackId(state);
  const playlist = getCurrentPlaylist(state);

  return playlist[0] === current;
};

export const isPlayerPlaying = pipe(
  getRoot,
  prop("playbackState"),
  equals("playing")
);

export const isInfinityMode = () => true;
