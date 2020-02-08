// @flow
import { prop, pipe } from "ramda";

import { FEATURE_NAME } from "./consts/index";

const getRoot = prop(FEATURE_NAME);

export const getUserId = pipe(
  getRoot,
  prop("userId")
);
