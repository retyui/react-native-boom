import reducer from "../reducer";

import { start, resolve, reject } from "../actions";
import { START, RESOLVE, REJECT } from "../types";

const taskId = "TOGGLE_FLAG";

describe(START, () => {
  test("should add task if not exists", () => {
    const action = start(taskId);
    const state = reducer({ byId: {} }, action);

    expect(state.byId[taskId]).toBeTruthy();
  });

  test("should mark task as running", () => {
    const action = start(taskId);
    const state = reducer({ byId: {} }, action);

    expect(state.byId[taskId].running).toBeTruthy();
  });
});

describe(RESOLVE, () => {
  test("should reset running flag", () => {
    const action = resolve({ id: taskId });
    const state = reducer({ byId: { [taskId]: { running: true } } }, action);

    expect(state.byId[taskId].running).toBeFalsy();
  });

  test("should reset error", () => {
    const action = resolve({ id: taskId });
    const state = reducer(
      { byId: { [taskId]: { error: "some-error" } } },
      action
    );

    expect(state.byId[taskId].error).toBeNull();
  });
});

describe(REJECT, () => {
  test("should reset running flag", () => {
    const error = "Failed";
    const action = reject({ id: taskId, error });
    const state = reducer({ byId: { [taskId]: { running: true } } }, action);

    expect(state.byId[taskId].running).toBeFalsy();
  });

  test("should set error", () => {
    const error = "Failed";
    const action = reject({ id: taskId, error });
    const state = reducer({ byId: { [taskId]: { error: null } } }, action);

    expect(state.byId[taskId].error).toEqual(error);
  });
});
