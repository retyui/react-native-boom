// @flow
import { StyleSheet } from "react-native";

const ACTIVE_COLOR = "#000";
const BAR_HEIGHT = 1;

const styles = StyleSheet.create({
  root: {
    height: BAR_HEIGHT,
    width: "100%",
    backgroundColor: "#00000030"
  },
  progressBar: {
    position: "absolute",
    top: -1,
    bottom: 0,
    left: 0,
    width: 0,
    backgroundColor: ACTIVE_COLOR
  }
});

export default styles;
