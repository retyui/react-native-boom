// @flow

// $FlowFixMe
import { includes, pipe, prop, keys, empty } from "ramda";

import { FEATURE_NAME } from "./consts/index";

const getRoot = prop(FEATURE_NAME);

const getTasksRoot = pipe(
  getRoot,
  prop("tasks")
);

const getMyAudiosCacheMap = pipe(
  getRoot,
  prop("myAudioCache")
);

const createTaskPropSelector = (getProp: Function) => (
  state: Object,
  taskId: string
) =>
  pipe(
    getTasksRoot,
    prop(taskId),
    getProp
  )(state);

export const getTaskErrorTracksIds = createTaskPropSelector(prop("errorIds"));

export const getTaskQueueTracksIds = createTaskPropSelector(prop("queue"));

// $FlowFixMe
export const areAllIdsCached = pipe(
  getTaskQueueTracksIds,
  empty
);

const isTrackIdInQueue = (
  state: Object,
  taskId: string,
  trackId: string
): boolean =>
  // $FlowFixMe
  pipe(
    getTaskQueueTracksIds,
    includes(trackId)
  )(state, taskId);

export const getTaskReadyTracksIds = createTaskPropSelector(prop("readyIds"));

export const isTrackIdInCacheQueue = (state: Object, trackId: string) => {
  const allTaskIds = keys(getTasksRoot(state));

  for (const taskId of allTaskIds) {
    if (isTrackIdInQueue(state, taskId, trackId)) {
      return true;
    }
  }

  return false;
};

export const getTrackCachedUri = (state: Object, trackId: string) =>
  pipe(
    getMyAudiosCacheMap,
    prop(trackId)
  )(state);

// $FlowFixMe
export const isTrackCached = pipe(
  getTrackCachedUri,
  Boolean
);
