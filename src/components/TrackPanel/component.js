// @flow
import React, { Component, createRef } from "react";
import { View } from "react-native";
import { WebView } from 'react-native-webview';
import { path } from "ramda";
import styles from "./styles";
import {
  extractActionFromMsgEvent,
  isExtractAction,
  isValidExtractAction,
  extractVkObject
} from "./utils";
import TopBar from "../../../components/TopBar";

const getUrl = path(["nativeEvent", "url"]);

const webViewSource = {
  uri: "https://m.vk.com/feed"
};

type Props = {|
  componentId: string,
  authorizeFailure: Function,
  authorizeSuccess: Function
|};

export default class TrackPanel extends Component<Props> {
  _onLoadEnd = event => {
    const url = getUrl(event);

    if (url && url.includes("/feed")) {
      this._tryExtractUserId();
    }
  };

  _onMessage = event => {
    const action = extractActionFromMsgEvent(event);

    if (isExtractAction(action)) {
      clearTimeout(this.timeout);

      if (action && isValidExtractAction(action)) {
        const { authorizeSuccess } = this.props;

        return authorizeSuccess(action.payload);
      }

      const { authorizeFailure } = this.props;

      return authorizeFailure(
        new Error("Не удалось получить информацию о пользователе")
      );
    }
  };

  _onError = event => {
    const { authorizeFailure } = this.props;

    authorizeFailure(event.nativeEvent);
  };

  timeout: TimeoutID;

  _tryExtractUserId() {
    const { current: webView } = this.web;

    if (webView) {
      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        const { authorizeFailure } = this.props;

        authorizeFailure(
          new Error(
            "Время ожидания вышло, запрос на получение информации о пользователя не удался"
          )
        );
      }, 10000);

      webView.injectJavaScript(`(${extractVkObject.toString()})();`);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  web = createRef();

  render() {
    const { componentId } = this.props;
    return (
      <View style={styles.root}>
        <TopBar
          componentId={componentId}
          options={{ statusBar: { visible: false } }}
        />
        <WebView
          startInLoadingState
          ref={this.web}
          source={webViewSource}
          onError={this._onError}
          onLoadEnd={this._onLoadEnd}
          onMessage={this._onMessage}
        />
      </View>
    );
  }
}
