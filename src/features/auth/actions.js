// @flow

import { createAction } from "redux-actions";

import { setRoot, showModal } from "../navigation/actions";
import { VK_MODAL_SCENE, WELCOME_SCENE } from "./consts/scenes";
import {
  AUTHORIZE,
  AUTHORIZE_FAILURE,
  AUTHORIZE_SUCCESS,
  DEAUTHORIZE
} from "./actionTypes";

export const deAuthorize = createAction(DEAUTHORIZE);
export const authorizeSuccess = createAction(AUTHORIZE_SUCCESS);
export const authorizeFailure = createAction(AUTHORIZE_FAILURE);
export const authorize = createAction(AUTHORIZE);

export const setRootToSignIn = () =>
  setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: WELCOME_SCENE,
              options: {
                topBar: {
                  visible: false,
                  animate: false,
                  height: 0
                }
              }
            }
          }
        ]
      }
    }
  });

export const showVKLoginModal = () =>
  showModal({
    stack: {
      children: [
        {
          component: {
            name: VK_MODAL_SCENE,
            options: {
              topBar: {
                visible: true,
                title: {
                  text: "Авторизация"
                },
                backButton: {
                  visible: false
                }
              }
            }
          }
        }
      ]
    }
  });
