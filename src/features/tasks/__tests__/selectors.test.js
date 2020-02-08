import { getTaskError, isTaskFinished, isTaskRunning } from "../selectors";

const id = "UPDATE";
const wrap = state => ({ tasks: state });

describe("getTaskError", () => {
  test("should return error if exist", () => {
    const error = "some-error";
    const state = wrap({ byId: { [id]: { error } } });

    expect(getTaskError(state, id)).toEqual(error);
  });
});

describe("isTaskRunning", () => {
  test("should return true if running", () => {
    const state = wrap({ byId: { [id]: { running: true } } });

    expect(isTaskRunning(state, id)).toBeTruthy();
  });

  test("should return false if not running", () => {
    const state = wrap({ byId: { [id]: { running: false } } });

    expect(isTaskRunning(state, id)).toBeFalsy();
  });

  test("should return false if not exist", () => {
    const state = wrap({ byId: {} });

    expect(isTaskRunning(state, id)).toBeFalsy();
  });
});

describe("isTaskFinished", () => {
  test("should return true if finished", () => {
    const state = wrap({ byId: { [id]: { finished: true } } });

    expect(isTaskFinished(state, id)).toBeTruthy();
  });

  test("should return false if not finished", () => {
    const state = wrap({ byId: { [id]: { finished: false } } });

    expect(isTaskFinished(state, id)).toBeFalsy();
  });

  test("should return false if not exist", () => {
    const state = wrap({ byId: {} });

    expect(isTaskFinished(state, id)).toBeFalsy();
  });
});
