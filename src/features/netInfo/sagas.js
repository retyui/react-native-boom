// @flow
import { path } from "ramda";
import { spawn, take, put } from "redux-saga/effects";
import NetInfo from "@react-native-community/netinfo";
import { eventChannel } from "redux-saga";

import {
  connectionChange,
  connectionUnknown,
  connectionOffline,
  connectionOnline
} from "./actions";

export const createNetworkChannel = () =>
  eventChannel(emitter => {
    const handlerConnectivityChange = connectionInfo =>
      emitter(connectionChange(connectionInfo));

    return NetInfo.addEventListener(handlerConnectivityChange);
  });

const isOfflineConnectionType = action =>
  path(["payload", "type"], action) === "none";
const isUnknownConnectionType = action =>
  path(["payload", "type"], action) === "unknown";

function* netWorkStatus() {
  const ch = createNetworkChannel();

  while (true) {
    const action = yield take(ch);

    if (isOfflineConnectionType(action)) {
      yield put(connectionOffline());
    } else if (isUnknownConnectionType(action)) {
      yield put(connectionUnknown());
    }

    yield put(connectionOnline());
  }
}

export default function* rootNetChannel(): Iterator<any> {
  yield spawn(netWorkStatus);
}
