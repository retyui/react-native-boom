import { compose, path } from "ramda";

const getRoot = path(["tasks"]);

export const getTaskError = (state, id) =>
  compose(
    path(["byId", id, "error"]),
    getRoot
  )(state);

export const isTaskRunning = (state, id) =>
  compose(
    path(["byId", id, "running"]),
    getRoot
  )(state);

export const isTaskFinished = (state, id) =>
  compose(
    path(["byId", id, "finished"]),
    getRoot
  )(state);
