// @flow
import { createAction, type ActionType } from "redux-actions";

import {
  DOWNLOAD_BEGIN,
  DOWNLOAD_PROGRESS,
  DOWNLOAD_FINISH,
  DOWNLOAD_ERROR
} from "./actionTypes";

import type {
  DownloadBeginCallbackResult,
  DownloadProgressCallbackResult
} from "./fs.types";

export const downloadBegin = createAction(
  DOWNLOAD_BEGIN,
  (v: DownloadBeginCallbackResult) => v
);

export const downloadProgress = createAction(
  DOWNLOAD_PROGRESS,
  (v: DownloadProgressCallbackResult) => v
);

export const downloadFinish = createAction(DOWNLOAD_FINISH);

export const downloadError = createAction(DOWNLOAD_ERROR, (e: Error) => e);

export type DownLoadBeginActionType = ActionType<typeof downloadBegin>;
export type DownLoadProgressActionType = ActionType<typeof downloadProgress>;
export type DownLoadFinishActionType = ActionType<typeof downloadFinish>;
export type DownLoadErrorActionType = ActionType<typeof downloadError>;

export type DownloadChannelActions =
  | DownLoadBeginActionType
  | DownLoadProgressActionType
  | DownLoadFinishActionType
  | DownLoadErrorActionType;
