// @flow

export type DownloadProgressCallbackResult = {
  jobId: number,
  contentLength: number,
  bytesWritten: number
};

export type DownloadBeginCallbackResult = {
  jobId: number,
  statusCode: number,
  contentLength: number,
  headers: Headers
};
