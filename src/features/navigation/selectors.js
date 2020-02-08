// @flow
import { pipe, prop } from "ramda";
import { FEATURE_NAME } from "./consts";

const getRoot = prop(FEATURE_NAME);

export const getComponentId = pipe(
  getRoot,
  prop("componentId")
);

export const getComponentName = pipe(
  getRoot,
  prop("componentName")
);
