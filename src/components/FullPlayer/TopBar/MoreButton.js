// @flow
import React, { type ElementConfig } from "react";

import Icon from "react-native-vector-icons/MaterialIcons";

import CircleButton from "../../CircleButton";

type Props = ElementConfig<typeof CircleButton>;

export default function MoreButton(props: Props) {
  return (
    <CircleButton {...props}>
      <Icon name="more-vert" size={24} color="#000" />
    </CircleButton>
  );
}
