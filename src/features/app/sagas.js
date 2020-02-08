// @flow
import type { Saga } from "redux-saga";
import {
  takeEvery,
  put,
  call,
  select,
  all,
  take,
  spawn
} from "redux-saga/effects";
import { REHYDRATE } from "redux-persist/lib/constants";

import registerAllComponents from "./register";
import { APP_LAUNCHED } from "../navigation/actionTypes";
import { DEAUTHORIZE, AUTHORIZE_SUCCESS } from "../auth/actionTypes";
import { getUserId } from "../currentUser/selectors";
import { hasAnyAudioTracks } from "../audio/selectors";
import { setRootToHome } from "../home/actions";
import { setRootToSignIn } from "../auth/actions";
import { APP_STARTED_SUCCESS } from "./actionTypes";
import { setBottomTabsVisible } from "../navigation/actions";

function* watchAppLaunch() {
  const isFirstRun = { state: true };

  while (true) {
    // yield call(selectLocale);

    if (isFirstRun.state) {
      isFirstRun.state = false;
      yield all([take(REHYDRATE), take(APP_LAUNCHED)]);
    } else {
      yield take(APP_LAUNCHED);
    }

    if (yield call(isSignUpRequired)) {
      yield call(redirectToSignIn);
    } else {
      yield call(redirectToHome);
    }
  }
}

function* isSignUpRequired() {
  const userId = yield select(getUserId);
  const hasSomeAudio = yield select(hasAnyAudioTracks);

  return !Boolean(userId && hasSomeAudio);
}

function* redirectToHome() {
  yield put(setBottomTabsVisible(true));
  yield put(setRootToHome());
  yield put({
    type: APP_STARTED_SUCCESS
  });
}

function* redirectToSignIn() {
  yield put(setRootToSignIn());
}

export default function* rootSaga(): Saga<void> {
  yield call(registerAllComponents);

  yield spawn(watchAppLaunch);
  yield takeEvery(DEAUTHORIZE, redirectToSignIn);
  yield takeEvery(AUTHORIZE_SUCCESS, redirectToHome);
}
