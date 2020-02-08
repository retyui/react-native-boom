// @flow
import { StyleSheet } from "react-native";

import { SECTION_ITEM_IMAGE_SIZE } from "../consts";

const COLS_WRAP_SIZE = Math.floor(SECTION_ITEM_IMAGE_SIZE * 0.4);

export const COUNT_COLS = 3;

const COL_MARGIN = 1;

const COL_WIDTH = Math.floor(
  COLS_WRAP_SIZE / COUNT_COLS - COL_MARGIN * (COUNT_COLS - 1)
);

export default StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#00000099",
    alignItems: "center",
    justifyContent: "center"
  },
  colsWrap: {
    width: COLS_WRAP_SIZE,
    height: COLS_WRAP_SIZE,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  col: {
    backgroundColor: "#fff",
    height: COLS_WRAP_SIZE,
    width: COL_WIDTH
  }
});
