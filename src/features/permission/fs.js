// @flow
import { type Saga } from "redux-saga";
import { put, call } from "redux-saga/effects";
import { PermissionsAndroid } from "react-native";
import { any, complement, equals, identical, pipe, values } from "ramda";

import { updateStoragePermissionStatus } from "./actions";

const {
  PERMISSIONS: { READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE }
} = PermissionsAndroid;

export function* requestStoragePermission(): Saga<Array<string>> {
  try {
    const granted = yield call(PermissionsAndroid.requestMultiple, [
      READ_EXTERNAL_STORAGE,
      WRITE_EXTERNAL_STORAGE
    ]);

    yield put(updateStoragePermissionStatus(granted));

    return granted;
  } catch (err) {
    console.warn(err);

    return ["error"];
  }
}

export const isPermissionGranted = pipe(
  values,
  any(identical(PermissionsAndroid.RESULTS.GRANTED))
);

export const canRequestPermissionAgain = pipe(
  values,
  any(complement(equals(PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN)))
);
