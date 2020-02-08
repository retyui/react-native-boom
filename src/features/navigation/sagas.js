import { buffers, eventChannel } from "redux-saga";
import {
  actionChannel,
  call,
  fork,
  put,
  select,
  spawn,
  take,
  takeEvery
} from "redux-saga/effects";
import { Navigation } from "react-native-navigation";
import { Platform } from "react-native";

import {
  appLaunched,
  componentDidAppear,
  dismissModal as dismissModalAction,
  navigationButtonPressed as navigationButtonPressedAction
} from "./actions";
import { CLOSE_MODAL_ID, MENU_ID } from "./consts/buttonIds";
import {
  APP_LAUNCHED,
  DISMISS_MODAL,
  NAVIGATION_BUTTON_PRESSED,
  POP_TO_ROOT,
  PUSH,
  SET_ROOT,
  SET_STACK_ROOT,
  SHOW_MODAL,
  POP,
  SET_BOTTOM_TABS_VISIBLE
} from "./actionTypes";
import { getComponentId } from "./selectors";

export const createNavigationChannel = () =>
  eventChannel(emitter => {
    const events = Navigation.events();
    const handleAppLaunched = props => emitter(appLaunched(props));
    const handleComponentDidAppear = props =>
      emitter(componentDidAppear(props));
    const handleNavigationButtonPressed = props =>
      emitter(navigationButtonPressedAction(props));

    events.registerAppLaunchedListener(handleAppLaunched);
    events.registerComponentDidAppearListener(handleComponentDidAppear);
    events.registerNavigationButtonPressedListener(
      handleNavigationButtonPressed
    );

    return () => {};
  });

export function* dismissModal({ payload: componentId }) {
  yield call([Navigation, Navigation.dismissModal], componentId);
}

export function* dismissCurrentModal() {
  const componentId = yield select(getComponentId);

  yield call(dismissModal, dismissModalAction(componentId));
}

export function* pop({ payload: { componentId, mergeOptions } }) {
  let id = componentId;

  if (!id) {
    id = yield select(getComponentId);
  }

  yield call([Navigation, Navigation.pop], id, mergeOptions);
}

export function* popToRoot({ payload }) {
  const componentId = yield select(getComponentId);

  yield call([Navigation, Navigation.popToRoot], componentId, payload);
}

export function* setBottomTabsVisible({ payload: visible }) {
  const componentId = yield select(getComponentId);

  yield call([Navigation, Navigation.mergeOptions], componentId, {
    bottomTabs: {
      visible,
      ...Platform.select({ android: { drawBehind: true } })
    }
  });
}

export function* push(action) {
  const { payload } = action;

  const componentId = yield select(getComponentId);

  yield call([Navigation, Navigation.push], componentId, payload);
}

export function* setRoot(action) {
  const { payload } = action;

  yield call([Navigation, Navigation.setRoot], payload);
}

export function* setStackRoot(action) {
  const { payload } = action;

  const componentId = yield select(getComponentId);

  yield call([Navigation, Navigation.setStackRoot], componentId, payload);
}

export function* showModal(action) {
  const { payload } = action;

  yield call([Navigation, Navigation.showModal], payload);
}

export function* openMenu() {
  const componentId = yield select(getComponentId);

  yield call([Navigation, Navigation.mergeOptions], componentId, {
    sideMenu: {
      left: {
        visible: true
      }
    }
  });
}

export function* closeMenu() {
  const componentId = yield select(getComponentId);

  yield call([Navigation, Navigation.mergeOptions], componentId, {
    sideMenu: {
      left: {
        visible: false
      }
    }
  });
}

export function* navigationButtonPressed(action) {
  const { payload } = action;
  const { buttonId, componentId } = payload;

  if (buttonId === CLOSE_MODAL_ID) {
    yield put(dismissModalAction(componentId));
  } else if (buttonId === MENU_ID) {
    yield call(openMenu);
  }
}

export function* appDidLaunch() {
  yield call([Navigation, Navigation.setDefaultOptions], {
    layout: {
      backgroundColor: "white",
      orientation: ["portrait"]
    }
  });
}

export const takeNavigation = (pattern, saga) =>
  fork(function*() {
    const channel = yield actionChannel(pattern, buffers.none());

    while (true) {
      const action = yield take(channel);

      yield call(saga, action);
    }
  });

export function* watchScreenActions() {
  yield takeEvery(APP_LAUNCHED, appDidLaunch);
  yield takeNavigation(DISMISS_MODAL, dismissModal);
  yield takeEvery(NAVIGATION_BUTTON_PRESSED, navigationButtonPressed);
  yield takeNavigation(POP, pop);
  yield takeEvery(POP_TO_ROOT, popToRoot);
  yield takeNavigation(PUSH, push);
  yield takeEvery(SET_ROOT, setRoot);
  yield takeNavigation(SET_STACK_ROOT, closeMenu);
  yield takeEvery(SET_STACK_ROOT, setStackRoot);
  yield takeNavigation(SHOW_MODAL, showModal);
  yield takeEvery(SET_BOTTOM_TABS_VISIBLE, setBottomTabsVisible);
}

export function* watchNavigationChannel() {
  const channel = yield call(createNavigationChannel);

  while (true) {
    const action = yield take(channel);

    yield put(action);
  }
}

export default function*() {
  yield spawn(watchNavigationChannel);
  yield spawn(watchScreenActions);
}
