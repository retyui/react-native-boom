// @flow
import { combineReducers } from "redux";
import { handleAction, handleActions } from "redux-actions";

import { UPDATE_IMAGE_SIZE } from "./actionTypes";

import { FEATURE_NAME } from "./consts/index";

import type { ImageSize } from "./types";

const defaultSize: ImageSize = "666x666";

const imageSize = handleAction(
  UPDATE_IMAGE_SIZE,
  (_, { payload: size }) => size,
  defaultSize
);

export default {
  [FEATURE_NAME]: combineReducers({
    imageSize
  })
};
