import { combineReducers } from "redux";
import { handleActions } from "redux-actions";

import { START, RESOLVE, REJECT } from "./types";
import { FEATURE_NAME } from "./consts/index";

const byIdReducer = handleActions(
  {
    [START]: (state, { payload: id }) => ({
      ...state,
      [id]: {
        ...(state[id] || {}),
        running: true,
        finished: false
      }
    }),
    [RESOLVE]: (state, { payload: { id } }) => ({
      ...state,
      [id]: {
        ...state[id],
        running: false,
        finished: true,
        error: null
      }
    }),
    [REJECT]: (state, { payload: { id, error } }) => ({
      ...state,
      [id]: {
        ...state[id],
        running: false,
        finished: true,
        error
      }
    })
  },
  {}
);

export default {
  [FEATURE_NAME]: combineReducers({
    byId: byIdReducer
  })
};
