// @flow
import React from "react";
import { Text, TouchableNativeFeedback, View } from "react-native";
import styles from "../AudioItem/styles";
import Icon from "../../Icon";

type Props = $ReadOnly<{|
  color: string,
  onPress?: Function
|}>;

export default function MixAllItem({ color, onPress }: Props) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.root}>
        <View style={styles.mixAllIcon}>
          <Icon name="shuffle" size={20} color={color} />
        </View>
        <View style={styles.textBox}>
          <Text style={[styles.mixAllText,{ color }]}>Перемешать всё</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

MixAllItem.defaultProps = {
  color: "#000"
};
