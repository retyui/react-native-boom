// @flow

export type DownloadProgressCallbackResult = {|
  jobId: number,
  contentLength: number,
  bytesWritten: number
|};

export type DownloadBeginCallbackResult = {|
  jobId: number,
  statusCode: number,
  contentLength: number,
  headers: Headers
|};

export type DownloadOptions = {|
  trackId: string,
  fromUrl: string,
  toFile: string,
  progressDivider?: number,
  needIndividualPush?: boolean
|};
