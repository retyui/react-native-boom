// @flow
export const delay = (ms: number): Promise<void> =>
  new Promise(ok => setTimeout(ok, ms));
