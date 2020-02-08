// @flow
import { append, assocPath, identical, path, pipe, reject } from "ramda";
import { handleAction, handleActions } from "redux-actions";

export const createAppender = (propName: string) => (
  state: Object,
  action: Object
) => {
  const { taskId, trackId } = action.payload;
  const prevQueueIds = path([taskId, "queue"], state);
  const prevPayloadIds = path([taskId, propName], state);

  return pipe(
    assocPath([taskId, "queue"], reject(identical(trackId), prevQueueIds)),
    assocPath([taskId, propName], append(trackId, prevPayloadIds))
  )(state);
};
