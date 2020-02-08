// @flow
import { prop, pipe, path, applySpec, isEmpty, not, allPass } from "ramda";

const defaultSource = require("../../img/redesign_placeholder_music_icon_remote.jpg");

import { sanitizeFileName } from "../../utils/sanitize";
import { getTrackCachedUri } from "../cache/selectors";

import { FEATURE_NAME } from "./consts";
import { makeShortId } from "./utils";

const getRoot = prop(FEATURE_NAME);

const createSelector = (getProp: Function) => (state: Object, id: string) =>
  pipe(
    getRoot,
    path(["byId", id]),
    getProp
  )(state);

export const getAudiosIds = pipe(
  getRoot,
  prop("ids")
);

export const hasAnyAudioTracks = pipe(
  getRoot,
  prop("byId"),
  isEmpty,
  not
);

export const getTrackId = createSelector(prop("fullId"));

export const getTrackTitle = createSelector(prop("title"));

export const getTrackAuthor = createSelector(prop("performer"));

export const getTrackSrc = createSelector(prop("url"));

export const getTrackExplicitStatus = createSelector(prop("isExplicit"));

// $FlowFixMe
export const getTrackSmallImageSource = pipe(
  createSelector(prop("coverUrl_p")),
  uri => (uri ? { uri } : defaultSource)
);

export const getTrackImageSource = (state: Object, trackId: string) => {
  if (hasItunesImageSource(state, trackId)) {
    return getBigItunesImageSource(state, trackId);
  }

  return getTrackSmallImageSource(state, trackId);
};

export const getBigItunesImageSource = createSelector(
  path(["itunes", "artwork"])
);

// $FlowFixMe
export const hasItunesImageSource = pipe(
  getBigItunesImageSource,
  prop("uri"),
  Boolean
);

export const canUseItunesSearch = allPass([
  // $FlowFixMe
  pipe(
    createSelector(path(["itunes", "notFound"])),
    not
  ),
  pipe(
    hasItunesImageSource,
    not
  )
]);

export const getFileName = (state: Object, id: string): string =>
  sanitizeFileName(
    `${getTrackAuthor(state, id)} – ${getTrackTitle(state, id)}.${makeShortId(
      getTrackId(state, id)
    )}.mp3`
  );

export const getTrackDate = applySpec({
  cachedUri: getTrackCachedUri,
  src: getTrackSrc,
  title: getTrackTitle,
  artist: getTrackAuthor,
  artwork: getTrackImageSource
});
