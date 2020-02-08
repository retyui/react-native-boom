// @flow
import React, { Component } from "react";
import { View } from "react-native";

import type { ProgressProps } from "../../hocs/WithProgress";
import styles from "./styles";

class SimpleTrackProgressBar extends Component<ProgressProps> {
  calcProgressWidth(): string {
    return `${(this.props.getProgress() * 100).toFixed(2)}%`;
  }

  render() {
    return (
      <View style={styles.root}>
        <View
          style={[styles.progressBar, { width: this.calcProgressWidth() }]}
        />
      </View>
    );
  }
}
export default SimpleTrackProgressBar;
