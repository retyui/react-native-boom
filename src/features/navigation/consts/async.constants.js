// @flow
import { Navigation } from "react-native-navigation";

const state = {
  constants: {
    backButtonId: "RNN.back",
    bottomTabsHeight: 56,
    statusBarHeight: 24,
    topBarHeight: 56
  }
};

Navigation.constants().then(constants => {
  state.constants = {
    ...state.constants,
    ...constants
  };
});

export const getBottomTabsHeight = () => state.constants["bottomTabsHeight"];
export const getStatusBarHeight = () => state.constants["statusBarHeight"];
export const getTopBarHeight = () => state.constants["topBarHeight"];
