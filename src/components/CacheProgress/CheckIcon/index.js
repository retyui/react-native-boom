// @flow

import React from "react";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const styles = StyleSheet.create({
  root: {
    width: 16,
    height: 16,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#53e481",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default function CheckIcon() {
  return (
    <View style={styles.root}>
      <Icon name="check" color="#fff" size={12} />
    </View>
  );
}
