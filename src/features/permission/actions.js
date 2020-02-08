// @flow
import { createAction, type ActionType } from "redux-actions";

import { UPDATE_STORAGE_PERMISSION } from "./actionTypes";

export const updateStoragePermissionStatus = createAction(
  UPDATE_STORAGE_PERMISSION
);
