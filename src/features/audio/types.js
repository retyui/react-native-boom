// @flow

export type ApiPlaylistIds = Array<string>;
export type ApiPlaylistData = { [key: string]: Array<mixed> };

export type ApiMyAudiosResponse = {|
  playlistIds: ApiPlaylistIds,
  playlistData: ApiPlaylistData
|};
