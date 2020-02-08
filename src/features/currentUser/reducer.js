// @flow
import { combineReducers } from "redux";
import { handleAction } from "redux-actions";

import { AUTHORIZE_SUCCESS } from "../auth/actionTypes";

import { FEATURE_NAME } from "./consts/index";
import { getUserIdByAction } from "../auth/VkModal/utils";

const userId = handleAction(
  AUTHORIZE_SUCCESS,
  (_, action) => getUserIdByAction(action),
  null
);

export default {
  [FEATURE_NAME]: combineReducers({
    userId
  })
};
