import { createAction } from "redux-actions";

import { START, RESOLVE, REJECT } from "./types";

export const start = createAction(START);
export const resolve = createAction(RESOLVE);
export const reject = createAction(REJECT);
