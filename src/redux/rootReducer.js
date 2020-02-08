// @flow
import { assocPath, propEq } from "ramda";
import { combineReducers } from "redux";
import { REHYDRATE } from "redux-persist/lib/constants";

import currentUser from "../features/currentUser/reducer";
import audio from "../features/audio/reducer";
import cache from "../features/cache/reducer";
import tasks from "../features/tasks/reducer";
import player from "../features/player/reducer";
import navigation from "../features/navigation/reducer";
import settings from "../features/settings/reducer";

import { DEAUTHORIZE } from "../features/auth/actionTypes";

const appReducer = combineReducers({
  ...currentUser,
  ...audio,
  ...tasks,
  ...player,
  ...navigation,
  ...settings,
  ...cache
});

const isDeAuthorizeAction = propEq("type", DEAUTHORIZE);
const isRehydrateAction = propEq("type", REHYDRATE);

const rootReducer = (state: Object, action: Object) => {
  if (isDeAuthorizeAction(action)) {
    state = {};
  }

  if (isRehydrateAction(action)) {
    state = assocPath(["player"], {}, state);
  }

  return appReducer(state, action);
};

export default rootReducer;
