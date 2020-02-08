// @flow
import { applySpec, identity } from "ramda";
import { createAction } from "redux-actions";

const createTaskAction = (
  type: string,
  payloadCreator?: ?Function,
  taskIdCreator?: ?Function = identity
) => createAction(type, payloadCreator, applySpec({ taskId: taskIdCreator }));

export default createTaskAction;
