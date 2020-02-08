// @flow
import { Navigation } from "react-native-navigation";

import auth from "../auth/navigation";
import home from "../home/navigation";

export const registerComponent = (name: string, Com: Function) =>
  Navigation.registerComponent(name, () => Com);

const allScenes = {
  ...auth,
  ...home
};

export default function registerAllComponents() {
  for (const [name, comp] of Object.entries(allScenes)) {
    // $FlowFixMe
    registerComponent(name, comp);
  }
}
