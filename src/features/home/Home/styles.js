// @flow
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "flex-end",
    paddingBottom: 32
  },
  vkBtnRoot: {
    backgroundColor: "#4c75a3",
    elevation: 2,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50
  },
  vkBtnIcon: {
    width: 50,
    height: 50,
    position: "absolute",
    top: "50%",
    left: 8,
    marginTop: -25
  },
  vkBtnText: {
    color: "#fff",
    fontSize: 20
  }
});
