// @flow
import type { Saga } from "redux-saga";

import type { DownloadChannelActions } from "./actions";

export type DownloadOptions = {|
  id: string,
  fromUrl: string,
  toFile: string,
  progressDivider?: number
|};

export type PushChannelCreator = () => {|
  close(): void,
  handlerActions(action: DownloadChannelActions): Saga<void>
|};
export type DownloadOptionsSaga = {|
  ...DownloadOptions,
  pushChannelCreator?: PushChannelCreator
|};
