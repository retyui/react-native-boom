// @flow
import React, { type ElementConfig } from "react";
import { View, TouchableNativeFeedback } from "react-native";

import { concatStyles } from "../../utils/styles";

import styles from "./styles";

type Props = {|
  ...$Exact<ElementConfig<typeof View>>,
  onPress?: Function,
  size: number
|};

function CircleButton({ onPress, size, style, ...props }: Props) {
  return (
    <View
      style={[
        styles.wrap,
        {
          width: size,
          height: size,
          borderRadius: size / 2
        }
      ]}
    >
      <TouchableNativeFeedback onPress={onPress}>
        <View style={concatStyles(styles.root, style)} {...props} />
      </TouchableNativeFeedback>
    </View>
  );
}

CircleButton.defaultProps = {
  size: 40
};

export default CircleButton;
