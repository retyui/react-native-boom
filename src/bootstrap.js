import "./features/notifications/createDefaultChannel";

if (process.env.NODE_ENV !== "production") {
  const { YellowBox } = require("react-native");

  YellowBox.ignoreWarnings(["Require cycle:", "componentWillReceiveProps"]);
}
