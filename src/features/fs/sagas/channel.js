// @flow
import { buffers, eventChannel, END } from "redux-saga";
import { downloadFile, stopDownload } from "react-native-fs";

import { emitProgress } from "../progressEmitter";
import {
  downloadBegin,
  downloadError,
  downloadFinish,
  downloadProgress
} from "../actions";

import type { DownloadBeginCallbackResult } from "../fs.types";
import type { DownloadOptions } from "../types";

export const createDownloadChannel = (options: DownloadOptions) =>
  eventChannel(emitter => {
    const { jobId, promise } = downloadFile({
      ...options,
      begin: (res: DownloadBeginCallbackResult) => emitter(downloadBegin(res)),
      progress: res => {
        emitter(downloadProgress(res));

        emitProgress(options.id, res);
      }
    });

    promise
      .then(result => emitter(downloadFinish(result)))
      .catch(error => emitter(downloadError(error)))
      .finally(() => emitter(END));

    return () => {
      console.log(" --- [DownloadChannel Closed]", jobId);

      stopDownload(jobId);
    };
  }, buffers.sliding(2));
