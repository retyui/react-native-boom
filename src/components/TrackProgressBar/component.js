// @flow
import React, { Component } from "react";

import { Text, View } from "react-native";

import ProgressBar from "../ProgressBar/component";
import { formatDuration } from "../../utils/formaters/date";

import styles from "./styles";

import type { ProgressProps } from "../../hocs/WithProgress";

type Props = {|
  ...ProgressProps,

  onSeek: number => void
|};

class TrackProgressBar extends Component<Props> {
  _onSeek = (seekInPercent: number) => {
    const { onSeek, updatePosition, duration } = this.props;

    if (onSeek) {
      const seek = seekInPercent * duration;
      onSeek(seek);
      updatePosition(seek);
    }
  };

  render() {
    const { position, duration, getProgress } = this.props;

    return (
      <ProgressBar progress={getProgress()} onSeek={this._onSeek}>
        <View style={styles.textWrap}>
          <Text style={styles.text}>{formatDuration(position)}</Text>
          <Text style={styles.text}>
            -{formatDuration(duration - position)}
          </Text>
        </View>
      </ProgressBar>
    );
  }
}

export default TrackProgressBar;
