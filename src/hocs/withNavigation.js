// @flow
import React, { Component, type ComponentType } from "react";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import { compose, omit } from "ramda";

// import withLocale from './withLocale';
import withProvider from "./withProvider";

import { type Dispatch } from "redux";

type Actions = {|
  onAppear: ({ componentId: string }) => any,
  onDisappear: () => any
|};

const withNavigation = (actions: $Shape<Actions> = {}) => <P: Object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> => {
  class WithNavigation extends Component<P & Actions> {
    constructor(props) {
      super(props);

      Navigation.events().bindComponent(this);
    }

    componentDidAppear() {
      const { onAppear } = this.props;

      onAppear();
    }

    componentDidDisappear() {
      const { onDisappear } = this.props;

      onDisappear();
    }

    render() {
      return (
        <WrappedComponent {...omit(["onAppear", "onDisappear"], this.props)} />
      );
    }
  }

  const mapDispatchToProps = <A: *>(dispatch: Dispatch<A>, { componentId }) => {
    const { onAppear, onDisappear } = actions;

    return {
      onAppear: () => onAppear && dispatch(onAppear({ componentId })),
      onDisappear: () => onDisappear && dispatch(onDisappear())
    };
  };

  return compose(
    withProvider,
    // withLocale,
    connect(
      null,
      mapDispatchToProps
    )
  )(WithNavigation);
};

export default withNavigation;
