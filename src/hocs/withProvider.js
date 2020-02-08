// @flow
import React, { Component, type ComponentType } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "../redux";

const withProvider = <P: *>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> => {
  class WithProvider extends Component<P> {
    render() {
      return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <WrappedComponent {...this.props} />
          </PersistGate>
        </Provider>
      );
    }
  }

  return WithProvider;
};

export default withProvider;
