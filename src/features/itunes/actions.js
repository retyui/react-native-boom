// @flow
import { createAction } from "redux-actions";

import { UPDATE_TRACK_IMAGE, ITUNES_IMAGE_NOT_FOUND } from "./actionTypes";

export const updateTrackImage = createAction(
  UPDATE_TRACK_IMAGE,
  (payload: {| trackId: string, uri: string, smallUri: string |}) => payload
);

export const notFound = createAction(
  ITUNES_IMAGE_NOT_FOUND,
  (trackId: string) => trackId
);
