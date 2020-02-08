// @flow
import CookieManager from "react-native-cookies";
import { ToastAndroid } from "react-native";
import { type Effect } from "redux-saga";
import { takeEvery, call } from "redux-saga/effects";

import { AUTHORIZE_FAILURE, DEAUTHORIZE } from "./actionTypes";
import { createErrorBoundary } from "../analytics/sagas";

const isWebViewError = obj => obj && obj.description;

function* showErrorMgs({ payload: error }) {
  if (
    isWebViewError(error) &&
    error.description === "net::ERR_INTERNET_DISCONNECTED"
  ) {
    return ToastAndroid.show("Потеряно соединение с интернетом");
  }

  if (error instanceof Error) {
    return ToastAndroid.show(error.actions);
  }

  return ToastAndroid.show("Не удалось авторизоваться");
}

function* handlerDeAuthorize() {
  yield call(CookieManager.clearAll);
}

export default function* rootSaga(): Iterator<Effect> {
  yield takeEvery(DEAUTHORIZE, createErrorBoundary(handlerDeAuthorize));
  yield takeEvery(AUTHORIZE_FAILURE, createErrorBoundary(showErrorMgs));
}
