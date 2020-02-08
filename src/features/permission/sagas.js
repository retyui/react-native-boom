// @flow
import { type Saga } from "redux-saga";
import OpenAppSettings from "react-native-app-settings";
import { call, fork } from "redux-saga/effects";

import { alert } from "../../utils/alert";

import {
  canRequestPermissionAgain,
  isPermissionGranted,
  requestStoragePermission
} from "./fs";

export function* tryGetStoragePermission(): Saga<boolean> {
  const result = yield call(requestStoragePermission);
  const isGranted: boolean = isPermissionGranted(result);

  if (!isGranted && !canRequestPermissionAgain(result)) {
    const answer = yield call(
      alert,
      "Доступ к фаловой ситеме отключён",
      "Разрешите доступ в настройках устройства.",
      {
        cancel: {
          text: "Не сейчас",
          style: "cancel"
        },
        ok: {
          text: "Открыть Настройки"
        }
      }
    );

    if (answer === "ok") {
      yield fork(OpenAppSettings.open);
    }

    return false;
  }

  return isGranted;
}
