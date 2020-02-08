// @flow
import React from "react";
import {
  View,
  Image,
  ImageBackground,
  TouchableNativeFeedback
} from "react-native";

import Text from "../../../components/Text";
import styles from "./styles";
import TopBar from "../../../components/TopBar";

const vkIcon = require("../img/ic_ab_app.png");

type Props = {|
  componentId: string,
  showLoginModal: Function
|};

export default function WelcomeScene({ showLoginModal, componentId }: Props) {
  return (
    <ImageBackground
      style={styles.root}
      source={{
        uri: `https://source.unsplash.com/random`
      }}
    >
      <TopBar
        componentId={componentId}
        options={{
          statusBar: { visible: false }
        }}
      />
      <TouchableNativeFeedback onPress={showLoginModal}>
        <View style={styles.vkBtnRoot}>
          <Image source={vkIcon} style={styles.vkBtnIcon} />
          <Text style={styles.vkBtnText}>ВКОНТАКТЕ</Text>
        </View>
      </TouchableNativeFeedback>
    </ImageBackground>
  );
}
