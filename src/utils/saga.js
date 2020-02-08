// @flow
import type { Pattern, Saga, Task } from "redux-saga";
import { cancel, fork, take } from "redux-saga/effects";

const createRunnerBetween = (
  startActionType: Pattern,
  endActionType: Pattern,
  saga: Function
) =>
  function* runnerBetween(): Saga<void> {
    while (true) {
      yield take(startActionType);

      const taskId = yield fork(saga);

      yield take(endActionType);

      yield cancel(taskId);
    }
  };

export const takeBetween = (...args: [Pattern, Pattern, Function]) =>
  fork(createRunnerBetween(...args));
