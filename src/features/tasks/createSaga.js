// @flow
import { put } from "redux-saga/effects";

import { start, resolve, reject } from "./actions";
import { createId } from "./utils";

const createTaskSaga = (saga: Function): Function =>
  function*(action, ...args) {
    const id = createId(action);

    yield put(start(id));

    try {
      const value = yield* saga(action, ...args);

      yield put(resolve({ id }));

      return value;
    } catch (error) {
      yield put(reject({ id, error }));

      throw error;
    }
  };

export default createTaskSaga;
