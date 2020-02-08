// @flow
import React, { Component } from "react";
import { clamp } from "ramda";
import {
  Animated,
  PanResponder,
  View,
  TouchableWithoutFeedback
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import Image from "../Image";
import Text from "../Text";
import SimpleTrackProgressBar from "../SimpleTrackProgressBar";
import FullPlayer from "../FullPlayer";

import styles, {
  calcMaxTranslateY,
  calcMinOffsetY,
  calcPanelHeight
} from "./styles";
import CircleButton from "../CircleButton";

type Props = {|
  title: string,
  author: string,
  playerPlay: Function,
  playerPause: Function,
  isPlaying: boolean,
  imageSource: Object,
  setBottomTabsVisible: Function
|};

type State = {| translateY: Animated.Value |};

export default class CurrentTrack extends Component<Props, State> {
  _previousTop: number = 0;

  state = {
    translateY: new Animated.Value(calcMinOffsetY())
  };

  _toTop = () => {
    const { setBottomTabsVisible } = this.props;

    Animated.timing(this.state.translateY, {
      toValue: (this._previousTop = calcMaxTranslateY()),
      duration: 100
    }).start();

    setBottomTabsVisible(false);
  };

  _toBottom = () => {
    const { setBottomTabsVisible } = this.props;

    Animated.spring(this.state.translateY, {
      toValue: (this._previousTop = calcMinOffsetY()),
      duration: 100
    }).start();

    setBottomTabsVisible(true);
  };

  _gestureIsClick(gestureState) {
    const gestureIsClickThreshold = 30;

    return (
      Math.abs(gestureState.dx) < gestureIsClickThreshold &&
      Math.abs(gestureState.dy) < gestureIsClickThreshold
    );
  }

  _shouldSetResponder = (evt, gestureState) => {
    return (
      evt.nativeEvent.touches.length === 1 &&
      !this._gestureIsClick(gestureState)
    );
  };

  _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: this._shouldSetResponder,
    onMoveShouldSetPanResponder: this._shouldSetResponder,
    onPanResponderMove: (event, gestureState) => {
      const value = this._previousTop + gestureState.dy;

      this.state.translateY.setValue(
        clamp(calcMaxTranslateY(), calcMinOffsetY(), value)
      );
    },
    onPanResponderRelease: (_, gestureState) => {
      const { dy } = gestureState;
      const isFromBottomPosition = this._previousTop === 0;

      if (isFromBottomPosition) {
        if (dy <= -55) {
          return this._toTop();
        }

        return this._toBottom();
      }

      if (dy >= 25) {
        return this._toBottom();
      }

      return this._toTop();
    }
  });

  render() {
    const {
      title,
      author,
      playerPlay,
      playerPause,
      isPlaying,
      imageSource,
      currentTrackId
    } = this.props;

    if (!currentTrackId) {
      return null;
    }

    return (
      <Animated.View
        style={[
          styles.floatRoot,
          {
            height: calcPanelHeight()
          },
          {
            transform: [
              {
                translateY: this.state.translateY
              }
            ]
          }
        ]}
        {...this._panResponder.panHandlers}
      >
        <View style={styles.root}>
          <TouchableWithoutFeedback onPress={this._toTop}>
            <View style={styles.controlRoot}>
              <Image
                source={imageSource}
                style={styles.image}
                fadeDuration={0}
              />
              <View style={styles.textBox}>
                <Text
                  style={styles.title}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {title}
                </Text>
                <Text
                  style={styles.author}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {author}
                </Text>
              </View>
              <View>
                {isPlaying ? (
                  <CircleButton onPress={playerPause}>
                    <Icon name="pause" size={25} color="#000" />
                  </CircleButton>
                ) : (
                  <CircleButton onPress={playerPlay}>
                    <Icon name="play-arrow" size={25} color="#000" />
                  </CircleButton>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
          <SimpleTrackProgressBar />
        </View>

        <FullPlayer onPressHidePanel={this._toBottom} />
      </Animated.View>
    );
  }
}
