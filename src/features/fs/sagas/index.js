// @flow
import type { Saga } from "redux-saga";

import { propEq } from "ramda";
import { fork, take, call } from "redux-saga/effects";

import { createDownloadChannel } from "./channel";

import type { DownloadOptionsSaga } from "../types";
import type { DownloadChannelActions } from "../actions";
import { DOWNLOAD_ERROR, DOWNLOAD_FINISH } from "../actionTypes";

export function* downloadFile({
  pushChannelCreator,
  ...downloadOptions
}: DownloadOptionsSaga): Saga<void> {
  let unsubscribe = [];

  try {
    const downloadCh = yield call(createDownloadChannel, downloadOptions);

    unsubscribe.push(downloadCh.close);

    let notification;

    if (pushChannelCreator) {
      notification = yield call(pushChannelCreator);

      unsubscribe.push(notification.close);
    }

    while (true) {
      const action: DownloadChannelActions = yield take(downloadCh);

      if (notification) {
        yield fork(notification.handlerActions, action);
      }

      if (propEq("type", DOWNLOAD_ERROR, action)) {
        throw action.payload;
      }

      if (propEq("type", DOWNLOAD_FINISH, action)) {
        break;
      }
    }
  } finally {
    for (const close of unsubscribe) {
      if (close) {
        close();
      }
    }
  }
}
