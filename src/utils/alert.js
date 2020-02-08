// @flow
import { Alert } from "react-native";

import type { AlertType } from "react-native/Libraries/Alert/AlertIOS";

export const alert = <B: Object>(
  title: string,
  message: string,
  buttons: B,
  options?: {| cancelable: boolean |},
  type?: AlertType
): Promise<$Keys<B>> =>
  new Promise(res => {
    const buttonsArray = [];

    for (const [name, btnOptions] of Object.entries(buttons)) {
      buttonsArray.push({
        ...btnOptions,
        onPress: () => res(name)
      });
    }

    Alert.alert(
      title,
      message,
      buttonsArray,
      {
        cancelable: false,
        ...options,
        onDismiss: () => res("dismiss")
      },
      type
    );
  });
