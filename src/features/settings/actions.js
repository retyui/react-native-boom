// @flow
import { createAction } from "redux-actions";

import { UPDATE_IMAGE_SIZE } from "./actionTypes";

import type { ImageSize } from "./types";

export const updateImageSize = createAction(
  UPDATE_IMAGE_SIZE,
  (size: ImageSize) => size
);
