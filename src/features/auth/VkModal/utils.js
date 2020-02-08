// @flow
import { allPass, path, pipe, propEq } from "ramda";

const EXTRACT_VK_OBJECT = "web/EXTRACT_VK_OBJECT";

export const isExtractAction = propEq("type", EXTRACT_VK_OBJECT);

export const getUserIdByAction = path(["payload", "id"]);

export const isValidExtractAction = allPass([
  isExtractAction,
  pipe(
    getUserIdByAction,
    id => Boolean(id)
  )
]);

export const extractActionFromMsgEvent = (event: Object): ?Object => {
  try {
    const data = path(["nativeEvent", "data"], event);

    const action = JSON.parse(data);

    if (action.type) {
      return action;
    }

    return null;
  } catch (e) {
    return null;
  }
};

// MUST be without deps
export function extractVkObject() {
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: "web/EXTRACT_VK_OBJECT",
        payload: window.vk
      })
    );
  } else {
    window.postMessage(
      JSON.stringify({
        type: "web/EXTRACT_VK_OBJECT",
        payload: window.vk
      })
    );
  }
}
