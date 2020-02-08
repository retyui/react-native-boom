// @flow
import { createAction } from "redux-actions";

import {
  CONNECTION_CHANGE,
  CONNECTION_OFFLINE,
  CONNECTION_ONLINE,
  CONNECTION_UNKNOWN
} from "./actionTypes";

export const connectionChange = createAction(CONNECTION_CHANGE);
export const connectionOffline = createAction(CONNECTION_OFFLINE);
export const connectionOnline = createAction(CONNECTION_ONLINE);
export const connectionUnknown = createAction(CONNECTION_UNKNOWN);
