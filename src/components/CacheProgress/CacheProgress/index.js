// @flow
import React, { Component } from "react";
import { Pie } from "react-native-progress";

import {
  type ProgressPayload,
  subscribeProgressById
} from "../../../features/fs/progressEmitter";

type Props = $ReadOnly<{|
  trackId: string
|}>;

type State = {|
  ...ProgressPayload
|};

class CacheProgress extends Component<Props, State> {
  _isMounted: boolean = false;
  _subscription: any = null;

  state = {
    contentLength: 0,
    bytesWritten: 0
  };

  componentDidMount() {
    this._isMounted = true;
    this._subscription = subscribeProgressById(
      this.props.trackId,
      (data: ProgressPayload) => {
        if (this._isMounted) {
          this.setState(() => data);
        }
      }
    );
  }

  componentWillUnmount() {
    this._isMounted = false;

    if (this._subscription) {
      this._subscription.remove();
    }
  }

  _getProgress() {
    if (!this.state.bytesWritten || !this.state.contentLength) {
      return 0;
    }

    return this.state.bytesWritten / this.state.contentLength;
  }

  render() {
    return (
      <Pie
        progress={this._getProgress()}
        borderColor="rgba(0,0,0,0)"
        unfilledColor="rgba(240,240,240,1)"
        color="rgba(150,150,150,1)"
        size={16}
      />
    );
  }
}

export default CacheProgress;
