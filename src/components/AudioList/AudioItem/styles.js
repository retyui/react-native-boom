// @glow
import { StyleSheet } from "react-native";

import { SECTION_ITEM_HEIGHT, SECTION_ITEM_IMAGE_SIZE } from "./consts";

export default StyleSheet.create({
  moreWrap: {
    width: 42,
    height: 42,
    borderRadius: 42,
    overflow: "hidden",
    marginRight: -6
  },
  more: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  dot: {
    backgroundColor: "#000",
    width: 4,
    height: 4,
    borderRadius: 4
  },
  dotBottom: { marginBottom: 2 },
  root: {
    height: SECTION_ITEM_HEIGHT,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center"
  },
  imageWrap: {
    width: SECTION_ITEM_IMAGE_SIZE,
    height: SECTION_ITEM_IMAGE_SIZE,
    borderRadius: 5,
    overflow: "hidden"
  },
  image: {
    width: SECTION_ITEM_IMAGE_SIZE,
    height: SECTION_ITEM_IMAGE_SIZE,
    ...StyleSheet.absoluteFillObject
  },
  mixAllText: {
    fontSize: 16
  },
  mixAllIcon: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  titleWrap: {
    flexDirection: "row"
  },
  textBox: {
    paddingLeft: 8,
    flex: 1,
    justifyContent: "center"
  },
  title: {
    color: "#000",
    fontSize: 14
  },
  author: {
    color: "#aaa",
    fontSize: 12
  },
  explicit: {
    fontWeight: "bold",
    color: "#aaa",
    paddingHorizontal: 3,
    marginLeft: 6,
    fontSize: 12,
    borderRadius: 3,
    backgroundColor: "#eee"
  }
});
