// @flow
import { handleActions } from "redux-actions";
import { FEATURE_NAME } from "./consts";
export const ignoredScenes = [];

import { COMPONENT_DID_APPEAR } from "./actionTypes";

const defaultState = {
  componentId: null,
  componentName: null
};

const actionsMap = {
  [COMPONENT_DID_APPEAR]: (state, { payload }) => {
    const { componentName, componentId } = payload;

    if (!ignoredScenes.includes(componentName)) {
      return {
        ...state,
        componentId,
        componentName
      };
    }

    return state;
  }
};

export default {
  [FEATURE_NAME]: handleActions(actionsMap, defaultState)
};
