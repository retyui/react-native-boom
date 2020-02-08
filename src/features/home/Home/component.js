// @flow
import React from "react";
import {
  View,
  Image,
  ImageBackground,
  TouchableNativeFeedback,
  Button
} from "react-native";

import Text from "../../../components/Text";
import styles from "./styles";

type Props = {|
  showLoginModal: Function
|};

export default function WelcomeScene({ logOut }: Props) {
  return (
    <View style={{ flex: 1, backgroundColor: "gold" }}>
      <Text>HOME</Text>
      <Button title="Log out" onPress={logOut} />
    </View>
  );
}
