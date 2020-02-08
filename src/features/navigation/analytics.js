// @flow
import { call, takeEvery } from "redux-saga/effects";

import { trackScreenView } from "@/features/analytics/sagas";

import { COMPONENT_DID_APPEAR } from "./actionTypes";

import { ignoredScenes } from "./reducer";

export function* trackComponentAppear(action): Iterator<any> {
  const { payload } = action;
  const { componentName } = payload;

  if (!ignoredScenes.includes(componentName)) {
    yield call(trackScreenView, componentName);
  }
}

export default function* setupAuthAnalytics(): Iterator<any> {
  yield takeEvery(COMPONENT_DID_APPEAR, trackComponentAppear);
}
