// @flow
import { type Saga } from "redux-saga";

import { call } from "redux-saga/effects";
import {
  exists,
  ExternalStorageDirectoryPath,
  mkdir,
  readDir
} from "react-native-fs";

import { sanitizeFileName } from "../../../utils/sanitize";

export const getCacheFolderPath = (): string =>
  `${ExternalStorageDirectoryPath}/Boom`;

export const getAbsolutePathByFileName = (filename: string): string =>
  `${getCacheFolderPath()}/${sanitizeFileName(filename)}`;

export const getAbsoluteUrlByFileName = (filename: string): string =>
  `file://${getAbsolutePathByFileName(filename)}`;

export function* createCacheFolder(): Saga<null> {
  return yield call(mkdir, getCacheFolderPath());
}

export function* isExistsCacheFolder(): Saga<boolean> {
  return yield call(exists, getCacheFolderPath());
}

export function* canCacheAudios(): Saga<boolean> {
  try {
    const isExists = yield call(isExistsCacheFolder);

    if (!isExists) {
      yield call(createCacheFolder);
    }

    return true;
  } catch (e) {
    return false;
  }
}

export function* getCachedFiles(): Saga<Array<string>> {
  const result = yield call(readDir, getCacheFolderPath());

  const files = result
    .filter(e => e.isFile() && e.size > 99)
    .map(({ name }) => name);

  return files;
}
