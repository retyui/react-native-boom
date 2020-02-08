// @flow
import React, { Component, Fragment } from "react";
import { View, TouchableNativeFeedback } from "react-native";

import {
  getStatusBarHeight,
  getTopBarHeight
} from "../../navigation/consts/async.constants";
import { SHORT_PANEL_H } from "../../../components/CurrentTrack/consts";
import Text from "../../../components/Text";

import MyAudioList from "./MyAudioList";
import styles from "./styles";
import TopBar from "../../../components/TopBar";
import { Platform } from "../../../../node_modules/react-native/Libraries/react-native/react-native-implementation";

export type Props = $ReadOnly<{|
  hasPlayedTrack: boolean
|}>;

class MyAudios extends Component<Props> {
  _renderListHeaderComponent() {
    return (
      <Fragment>
        <View>
          <Text>Аудиозаписи</Text>
          <TouchableNativeFeedback>
            <Text>изменить</Text>
          </TouchableNativeFeedback>
        </View>
      </Fragment>
    );
  }

  _renderListFooterComponent = () =>
    this.props.hasPlayedTrack && <View style={{ height: SHORT_PANEL_H }} />;

  render() {
    const { componentId } = this.props;
    return (
      <Fragment>
        <TopBar
          componentId={componentId}
          options={{
            statusBar: {
              style: "dark",
              backgroundColor: "transparent",
              drawBehind: true
            },
            bottomTabs: { drawBehind: true }
          }}
        />
        <View style={{ height: getStatusBarHeight() + getTopBarHeight() }} />
        <MyAudioList
          style={styles.root}
          ListHeaderComponent={this._renderListHeaderComponent}
          ListFooterComponent={this._renderListFooterComponent}
        />
      </Fragment>
    );
  }
}

export default MyAudios;
