// @flow
import React, { Component } from "react";

import { TouchableWithoutFeedback, View } from "react-native";

import styles from "./styles";
import type {
  LayoutEvent,
  PressEvent
} from "react-native/Libraries/Types/CoreEventTypes";
import { concatStyles } from "../../utils/styles";

type Props = {|
  progress: number,
  onSeek?: number => void,
  children?: any,
  style?: any
|};

class ProgressBar extends Component<Props> {
  calcProgressWidth(): string {
    return `${(this.props.progress * 100).toFixed(2)}%`;
  }

  handlerOnPress = ({ nativeEvent: { locationX } }: PressEvent) => {
    const { onSeek } = this.props;

    const seek = locationX / this.layout.width;

    if (onSeek) {
      onSeek(seek);
    }
  };

  layout = {
    height: 1,
    width: 1,
    y: 0,
    x: 0
  };

  handlerOnLayout = ({ nativeEvent: { layout } }: LayoutEvent) => {
    this.layout = layout;
  };

  render() {
    const { style } = this.props;

    return (
      <TouchableWithoutFeedback
        onPress={this.handlerOnPress}
        onLayout={this.handlerOnLayout}
      >
        <View pointerEvents="box-only" style={concatStyles(styles.root, style)}>
          <View style={styles.backBar}>
            <View
              style={[styles.progressBar, { width: this.calcProgressWidth() }]}
            />
            <View
              style={[
                styles.circleIcon,
                {
                  left: this.calcProgressWidth()
                }
              ]}
            />
          </View>
          {this.props.children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default ProgressBar;
