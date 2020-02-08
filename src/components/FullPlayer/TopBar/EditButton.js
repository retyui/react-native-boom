// @flow
import React, { type ElementConfig } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

import CircleButton from "../../CircleButton";

type Props = ElementConfig<typeof CircleButton>;

export default function EditButton(props: Props) {
  return (
    <CircleButton {...props}>
      <Icon name="edit" size={22} color="#000" />
    </CircleButton>
  );
}
