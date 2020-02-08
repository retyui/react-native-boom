// @flow
import { StyleSheet, Dimensions } from "react-native";

import { getBottomTabsHeight } from "../../features/navigation/consts/async.constants";

import { SHORT_PANEL_PADDING_V, IMAGE_SIZE, SHORT_PANEL_H } from "./consts";

export const { height: VH } = Dimensions.get("window");

export const calcUsablePanelHeight = () => VH;

export const calcPanelHeight = () => calcUsablePanelHeight() + SHORT_PANEL_H;
export const calcMinOffsetY = () =>
  calcUsablePanelHeight() - getBottomTabsHeight() - SHORT_PANEL_H;
export const calcMaxTranslateY = () => -SHORT_PANEL_H;

export default StyleSheet.create({
  floatRoot: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    elevation: 20
  },
  root: {
    height: SHORT_PANEL_H,
    backgroundColor: "#fff"
  },
  controlRoot: {
    flex: 1,
    height: SHORT_PANEL_H - 1,
    flexDirection: "row",
    paddingVertical: SHORT_PANEL_PADDING_V,
    paddingHorizontal: 16
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 4,
    flexBasis: IMAGE_SIZE
  },
  textBox: {
    flex: 1,
    marginRight: "auto",
    marginLeft: 8,
    justifyContent: "center"
  },
  title: {
    fontSize: 14,
    color: "#000"
  },
  author: {
    fontSize: 14,
    color: "#aaa"
  }
});
