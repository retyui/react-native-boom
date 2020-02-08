// @flow
import {
  filter,
  fromPairs,
  identity,
  map,
  memoizeWith,
  pipe,
  prop
} from "ramda";

import {
  CachesDirectoryPath,
  downloadFile,
  exists,
  mkdir,
  readDir
} from "react-native-fs";

import { createHash as createHashBase } from "../../utils/hash";

import type { Source } from "../../types";

const state = Object.seal({ cache: {} });

const memoize = memoizeWith(identity);

const createHash = memoize(createHashBase);

const getCacheFolderPath = () => `${CachesDirectoryPath}/img`;
const createPathByUri = (uri: string) =>
  `file://${getCacheFolderPath()}/${createHash(uri)}.png`;
const createPathByFileName = (name: string) =>
  `file://${getCacheFolderPath()}/${name}`;
const getHashByFileName = (name: string): string => name.replace(".png", "");

export const downloadImage = memoize(async (uri: string) => {
  const toFile = createPathByUri(uri);

  await tryCreateCacheFolder();

  return downloadFile({ fromUrl: uri, toFile }).promise.then(() => {
    state.cache[createHash(uri)] = {
      uri: toFile
    };
  });
});

const tryCreateCacheFolder = async () => {
  const isExists = await exists(getCacheFolderPath());

  if (!isExists) {
    await mkdir(getCacheFolderPath());

    return true;
  }

  return true;
};

// $FlowFixMe
const getUriBySource = prop("uri");

const updateCache = async () => {
  if (await tryCreateCacheFolder()) {
    const result = await readDir(getCacheFolderPath());

    state.cache = pipe(
      // $FlowFixMe
      filter(e => e && e.isFile() && e.size > 1),
      map(({ name }) => [
        getHashByFileName(name),
        {
          uri: createPathByFileName(name)
        }
      ]),
      fromPairs
    )(result);
  }
};

updateCache().catch(e => console.log(" --- updateCache error", e));

export const getCachedSource = (source: Source): Source => {
  const uri = getUriBySource(source);

  if (uri) {
    const hash = createHash(uri);

    if (state.cache[hash]) {
      return state.cache[hash];
    }

    downloadImage(uri).catch(e => console.log(" ---  downloadImage error", e));
  }

  return source;
};
