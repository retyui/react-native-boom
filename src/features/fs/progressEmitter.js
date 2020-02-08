// @flow
import { EventEmitter } from "fbemitter";

import type { DownloadProgressCallbackResult } from "./fs.types";

const PROGRESS = "PROGRESS";

const emitter = new EventEmitter();

export type ProgressPayload = {|
  contentLength: number,
  bytesWritten: number
|};

export const emitProgress = (
  id: string,
  { contentLength, bytesWritten }: DownloadProgressCallbackResult
) => {
  emitter.emit(`${PROGRESS}/${id}`, { contentLength, bytesWritten });
};

export const subscribeProgressById = (
  id: string,
  fn: ProgressPayload => void
) => {
  return emitter.addListener(`${PROGRESS}/${id}`, fn);
};
