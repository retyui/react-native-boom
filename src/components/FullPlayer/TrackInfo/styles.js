// @glow
import { Dimensions, StyleSheet } from "react-native";
const { width: VW } = Dimensions.get("screen");

const getImageSize = () => VW - 16 * 2;

export default StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 8,
    justifyContent: "space-around"
  },
  imgWrap: {
    height: getImageSize(),
    width: getImageSize(),
    borderRadius: 10,
    overflow: "hidden",
    elevation: 7,
    marginBottom: 16,
    marginTop: 16,
    backgroundColor: "#fff"
  },
  img: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    height: getImageSize(),
    width: getImageSize()
  },
  bigImg: {
    ...StyleSheet.absoluteFillObject
  },
  textInfoTextCell: {
    flex: 1
  },

  textInfoIconCell: {
    flexBasis: 36,
    alignItems: "center",
    justifyContent: "center"
  },
  textInfoBox: {
    flex: 1,
    maxHeight: 40,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    color: "#000"
  },
  author: {
    textAlign: "center",
    fontSize: 12,
    color: "#aaa"
  },
  controlWrap: {
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center"
  },
  controlCell: {
    flex: 1,
    alignItems: "center"
  },

  volumeEmptyIcon: {
    width: 40
  },
  volumeRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  volumeIcon: {
    paddingHorizontal: 2
  },
  volumeBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  }
});
