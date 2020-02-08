// @flow
import React, { Component, type ComponentType, Fragment } from "react";
import CurrentTrack from "../components/CurrentTrack";

const withCurrentTrack = () => <P: Object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> => {
  class WithCurrentTrack extends Component<P> {
    render() {
      return (
        <Fragment>
          <WrappedComponent {...this.props} />
          <CurrentTrack />
        </Fragment>
      );
    }
  }

  return WithCurrentTrack;
};

export default withCurrentTrack;
