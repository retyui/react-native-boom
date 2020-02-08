// @flow
import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import Swiper from "react-native-swiper";

import TopBar from "./TopBar";
import TrackInfo from './TrackInfo';
import styles from "./styles";

import type { Props, State } from "./types";
import { getStatusBarHeight } from "../../features/navigation/consts/async.constants";

class FullPlayer extends Component<Props, State> {
  state = {
    index: 1,
    hasTopBarShadow: false
  };

  _getTopBarPropsByIndex() {
    const { index, hasTopBarShadow } = this.state;

    const baseProps = {
      title: "",
      hasTopBarShadow,
      onPressHidePanel: this.props.onPressHidePanel,
      onPressMore: () => {},
      onPressEdit: () => {}
    };

    if (index === 0) {
      return {
        ...baseProps,
        title: "Рекомендации"
      };
    }
    if (index === 1) {
      return {
        ...baseProps,
        title: "Сейчас играет",
        rightButtonType: "more"
      };
    }

    if (index === 2) {
      return {
        ...baseProps,
        title: "Очередь воспроизведения",
        rightButtonType: "edit"
      };
    }

    return baseProps;
  }

  renderTopBar() {
    return <TopBar {...this._getTopBarPropsByIndex()} />;
  }

  _onIndexChanged = (index: number) => {
    this.setState(() => ({ index }));
  };

  render() {
    return (
      <View
        style={[
          styles.root,
          {
            paddingTop: getStatusBarHeight()
          }
        ]}
      >
        {this.renderTopBar()}
        <Swiper
          bounces
          loop={false}
          showsPagination={false}
          index={this.state.index}
          onIndexChanged={this._onIndexChanged}
          containerStyle={styles.swiperContainerStyle}
        >
          <View style={styles2.slide1}>
            <Text style={styles2.text}>Hello Swiper</Text>
          </View>
          <TrackInfo/>
          <View style={styles2.slide3}>
            <Text style={styles2.text}>And simple</Text>
          </View>
        </Swiper>
      </View>
    );
  }
}

const styles2 = StyleSheet.create({
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB"
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5"
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  }
});

export default FullPlayer;
