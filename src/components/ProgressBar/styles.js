// @flow
import { StyleSheet } from "react-native";

const ACTIVE_COLOR = "#000";
const SIZE = 16;
const BAR_HEIGHT = 2;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: SIZE,
    paddingVertical: (SIZE - BAR_HEIGHT) / 2
  },
  backBar: {
    height: BAR_HEIGHT,
    width: "100%",
    backgroundColor: "#00000030"
  },
  progressBar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 0,
    backgroundColor: ACTIVE_COLOR
  },
  circleIcon: {
    position: "absolute",
    left: 0,
    top: -(SIZE / 2 - BAR_HEIGHT / 2),
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: ACTIVE_COLOR,
    marginLeft: -SIZE / 2
  },
  textWrap: {
    paddingTop: 6,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  text: {
    fontSize: 10
  }
});

export default styles;
