// @flow
import React, { Component } from "react";
import { View } from "react-native";

import { getTopBarHeight } from "../../../features/navigation/consts/async.constants";
import Text from "../../Text";

import DownButton from "./DownButton";
import EditButton from "./EditButton";
import MoreButton from "./MoreButton";
import CircleButton from "../../CircleButton";

import styles from "./styles";

import type { Props } from "./types";

class TopBar extends Component<Props> {
  renderRightButton() {
    const { rightButtonType, onPressMore, onPressEdit } = this.props;
    if (rightButtonType === "edit") {
      return <EditButton onPress={onPressEdit} />;
    }

    if (rightButtonType === "more") {
      return <MoreButton onPress={onPressMore} />;
    }

    return <View style={styles.emptyBtn} />;
  }

  render() {
    const { onPressHidePanel, hasTopBarShadow, title } = this.props;

    return (
      <View
        style={[
          styles.topBarRoot,
          { height: getTopBarHeight(), elevation: hasTopBarShadow ? 3 : 0 }
        ]}
      >
        <DownButton onPress={onPressHidePanel} />
        <Text style={styles.title}>{title}</Text>
        {this.renderRightButton()}
      </View>
    );
  }
}

export default TopBar;
