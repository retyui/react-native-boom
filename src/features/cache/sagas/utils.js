// @flow
import { type Saga } from "redux-saga";
import { propEq } from "ramda";
import { call } from "redux-saga/effects";

import {
  DOWNLOAD_BEGIN,
  DOWNLOAD_ERROR,
  DOWNLOAD_FINISH,
  DOWNLOAD_PROGRESS
} from "../../fs/actionTypes";

import { createProgressPushNotificationChannel } from "../../notifications/progress.channel";
import type { DownloadChannelActions } from "../../fs/actions";
import type { PushChannelCreator } from "../../fs/types";

export function createProgressPushNotification(): PushChannelCreator {
  const push = createProgressPushNotificationChannel({
    getBody: ({ current, max }) =>
      `Осталось ${Math.floor(current)}% из ${max}%`,
    title: "Загрузка аудиозаписей",
    max: 100,
    current: 0
  });

  // $FlowFixMe
  return {
    handlerActions: function*(action: DownloadChannelActions): Saga<void> {
      if (propEq("type", DOWNLOAD_BEGIN, action)) {
        yield call(push.show);
      }

      if (propEq("type", DOWNLOAD_PROGRESS, action)) {
        const { contentLength, bytesWritten } = action.payload;

        yield call(push.updateProgress, (bytesWritten / contentLength) * 100);
      }

      if (
        propEq("type", DOWNLOAD_ERROR, action) ||
        propEq("type", DOWNLOAD_FINISH, action)
      ) {
        return yield call(push.close);
      }
    },
    close: () => {
      push.close();
    }
  };
}
