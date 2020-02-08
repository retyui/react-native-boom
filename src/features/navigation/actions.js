// @flow
import { createAction, type ActionType } from "redux-actions";

import {
  APP_LAUNCHED,
  COMPONENT_DID_APPEAR,
  DISMISS_MODAL,
  NAVIGATION_BUTTON_PRESSED,
  POP,
  POP_TO_ROOT,
  PUSH,
  SET_ROOT,
  SET_STACK_ROOT,
  SHOW_MODAL,
  SET_BOTTOM_TABS_VISIBLE
} from "./actionTypes";

export const appLaunched = createAction(APP_LAUNCHED);

export const componentDidAppear = createAction(COMPONENT_DID_APPEAR);

export const dismissModal = createAction(DISMISS_MODAL);

export const navigationButtonPressed = createAction(NAVIGATION_BUTTON_PRESSED);

export const push = createAction(PUSH);

export const setRoot = createAction(SET_ROOT);

export const setStackRoot = createAction(SET_STACK_ROOT);

export const popToRoot = createAction(POP_TO_ROOT);

export const showModal = createAction(SHOW_MODAL);

export const pop = createAction(
  POP,
  (componentId?: string, mergeOptions?: Object) => ({
    componentId,
    mergeOptions
  })
);

export type NavigationButtonPressedAction = ActionType<
  typeof navigationButtonPressed
>;

export const setBottomTabsVisible = createAction(SET_BOTTOM_TABS_VISIBLE);
