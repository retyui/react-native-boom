// @flow
import { Platform } from "react-native";

import type { TranslateFunction } from "@/hocs/withTranslations";

import { BACK_ID, CLOSE_MODAL_ID, MENU_ID } from "./buttonIds";
import { CANCEL } from "./translations";

const closeButtonWithIcon = {
  id: CLOSE_MODAL_ID,
  color: "black",
  icon: require("../icons/close.png")
};

export const leftCloseButton = () => ({
  leftButtons: [closeButtonWithIcon]
});

export const rightCloseButton = () => ({
  rightButtons: [closeButtonWithIcon]
});

export const backButton = () => ({
  leftButtons: [
    {
      id: BACK_ID,
      icon: require("../icons/back.png")
    }
  ]
});

export const closeButton = Platform.select({
  ios: (translate: TranslateFunction) => {
    const button = {
      id: CLOSE_MODAL_ID,
      color: "black",
      text: translate(CANCEL),
      fontFamily: GraphikLCG.Regular,
      fontSize: 13
    };

    return {
      leftButtons: [button]
    };
  },
  android: leftCloseButton
});

export const menuButton = () => ({
  leftButtons: [
    {
      id: MENU_ID,
      color: "black",
      icon: require("../icons/menu.png")
    }
  ]
});
