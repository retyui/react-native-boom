// @flow
import React, { type ElementConfig } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

import CircleButton from "../../CircleButton";

type Props = ElementConfig<typeof CircleButton>;

export default function DownButton(props: Props) {
  return (
    <CircleButton {...props}>
      <Icon name="keyboard-arrow-down" size={30} color="#000" />
    </CircleButton>
  );
}
