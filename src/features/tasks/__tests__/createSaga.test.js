import { put } from "redux-saga/effects";

import { start, resolve, reject } from "../actions";
import createSaga from "../createSaga";
import { createId } from "../utils";

const action = { type: "RUNNER", meta: { taskId: "333" } };
const taskId = createId(action);
const runner = function*(anotherAction, key) {
  yield key;
  yield "1";
  yield "2";

  return "3";
};
const wrappedRunner = createSaga(runner);

test("should emit START action first", () => {
  const saga = wrappedRunner(action);

  expect(saga.next().value).toEqual(put(start(taskId)));
});

test("should pass-through all arguments", () => {
  const someKey = "key";
  const saga = wrappedRunner(action, someKey);

  saga.next();

  expect(saga.next().value).toEqual(someKey);
});

test("should run yield all other values", () => {
  const saga = wrappedRunner(action);

  saga.next();
  saga.next();

  expect(saga.next().value).toEqual("1");
  expect(saga.next().value).toEqual("2");
});

test("should emit RESOLVE when wrapped generator is finished", () => {
  const saga = wrappedRunner(action);

  saga.next();
  saga.next();
  saga.next();
  saga.next();

  expect(saga.next().value).toEqual(put(resolve({ id: taskId })));
});

test("should emit REJECT if wrapped generator has throwed", () => {
  expect.assertions(1);

  const saga = wrappedRunner(action);
  const error = "some-error";

  saga.next();
  saga.next();
  saga.next();

  expect(saga.throw(error).value).toEqual(put(reject({ id: taskId, error })));
});

test("should return same value as wrapped generator", () => {
  const saga = wrappedRunner(action);

  saga.next();
  saga.next();
  saga.next();
  saga.next();
  saga.next();

  const { value, done } = saga.next();

  expect(value).toEqual("3");
  expect(done).toBeTruthy();
});
