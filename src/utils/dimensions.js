// @flow
import { Dimensions } from "react-native";

export const getWindowWidth = (): number => {
  const { width, height } = Dimensions.get("window");

  return Math.min(width, height);
};

export const getWindowHeight = (): number => {
  const { width, height } = Dimensions.get("window");

  return Math.max(width, height);
};

export const getScreenWidth = (): number => {
  const { width, height } = Dimensions.get("screen");

  return Math.min(width, height);
};

export const getScreenHeight = (): number => {
  const { width, height } = Dimensions.get("screen");

  return Math.max(width, height);
};
