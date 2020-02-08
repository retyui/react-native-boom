// @flow
import React, { Component } from "react";
import type { CompositeAnimation } from "react-native/Libraries/Animated/src/AnimatedImplementation";
import AnimatedValue from "react-native/Libraries/Animated/src/nodes/AnimatedValue";
import { values, pipe, map, range, fromPairs, keys, clamp } from "ramda";
import { View, Animated } from "react-native";

import { randomMinMax } from "../../../../utils/random";

import styles, { COUNT_COLS } from "./styles";

type Props = $ReadOnly<{|
  isPlayerPlaying: boolean,
  trackId: string
|}>;

type State = {|
  [key: string]: AnimatedValue
|};

const defaultScale = 0.1;
const getRandomScale = () => clamp(defaultScale, 1, Math.random());
const createColState = pipe(
  range,
  map(index => [index, new Animated.Value(defaultScale)]),
  fromPairs
);

class AnimatedPlayState extends Component<Props, State> {
  // $FlowFixMe
  state = createColState(0, COUNT_COLS);

  _animations: { [index: string]: CompositeAnimation } = {};

  animateCol(index: string) {
    if (this._animations[index] && this._animations[index].stop) {
      this._animations[index].stop();
    }

    if (!this.state[index]) {
      console.warn(
        " --- [AnimatedPlayState]: Invalid col index: ",
        index,
        "| state: ",
        keys(this.state)
      );
      return;
    }

    this._animations[index] = Animated.timing(this.state[index], {
      toValue: getRandomScale(),
      duration: randomMinMax(200, 500),
      useNativeDriver: true
    });

    this._animations[index].start(({ finished }) => {
      if (finished) {
        this.animateCol(index);
      }
    });
  }

  _startAnimation() {
    map(index => {
      this.animateCol(index);
    }, keys(this.state));
  }

  _stopAnimation() {
    map((animation: CompositeAnimation) => {
      if (animation && animation.stop) {
        animation.stop();
      }
    }, values(this._animations));

    map(e => e.setValue(defaultScale), values(this.state));
  }

  componentDidMount() {
    this._startAnimation();
  }

  componentDidUpdate(prevProps: Props) {
    const { isPlayerPlaying } = this.props;

    if (prevProps.isPlayerPlaying !== isPlayerPlaying) {
      if (isPlayerPlaying) {
        this._startAnimation();
      } else {
        this._stopAnimation();
      }
    }
  }

  _renderAnimatedViews() {
    return (
      <View style={styles.colsWrap}>
        {map(
          index => (
            <Animated.View
              key={index}
              style={[
                styles.col,
                { transform: [{ scaleY: this.state[index] }] }
              ]}
            />
          ),
          keys(this.state)
        )}
      </View>
    );
  }

  render() {
    return <View style={styles.root}>{this._renderAnimatedViews()}</View>;
  }
}

export default AnimatedPlayState;
