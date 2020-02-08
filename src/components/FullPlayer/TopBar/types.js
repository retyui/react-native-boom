// @flow

export type Props = $ReadOnly<{|
  rightButtonType?: string,
  onPressMore: Function,
  onPressEdit: Function,
  onPressHidePanel: Function,
  hasTopBarShadow: boolean,
  title: string
|}>;
