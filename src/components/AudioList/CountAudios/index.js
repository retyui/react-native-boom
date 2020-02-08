// @flow
import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

import { formatAudioCount } from "../../../utils/formaters/count";

const styles = StyleSheet.create({
  root: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 14,
    color: "#aaa"
  }
});

class CountAudios extends Component<{| count: number |}> {
  render() {
    const { count } = this.props;
    return (
      count > 0 && (
        <View style={styles.root}>
          <Text style={styles.text}>{`${count} ${formatAudioCount(
            count
          )}`}</Text>
        </View>
      )
    );
  }
}

export default CountAudios;
