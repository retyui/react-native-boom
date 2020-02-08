// @flow
import { pipe, prop } from "ramda";

import { FEATURE_NAME } from "./consts/index";

const getRoot = prop(FEATURE_NAME);

export const getImageSize = pipe(
  getRoot,
  prop("imageSize")
);
