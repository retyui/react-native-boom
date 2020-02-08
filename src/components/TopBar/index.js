// @flow
import { PureComponent } from "react";
import { Navigation } from "react-native-navigation";

import { type Props } from "./types";

export default class TopBar extends PureComponent<Props> {
  componentDidMount() {
    this.updateTopBar();
  }

  componentDidUpdate() {
    this.updateTopBar();
  }

  updateTopBar() {
    const { componentId, text, options } = this.props;

    Navigation.mergeOptions(componentId, {
      topBar: {
        visible: true,
        title: text ? { text } : undefined
      },
      ...options
    });
  }

  render() {
    return null;
  }
}
