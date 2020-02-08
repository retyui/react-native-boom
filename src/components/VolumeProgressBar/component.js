// @flow
import React, { Component } from "react";
import SystemSetting from "react-native-system-setting";

import type { Props, State } from "./types";
import ProgressBar from "../ProgressBar/component";

let defaultVolume = 0;

SystemSetting.getVolume().then(volume => {
  defaultVolume = volume;
});

class VolumeProgressBar extends Component<Props, State> {
  _isMounted: boolean = false;
  _unSub: Object; //NativeEventEmitter
  state = {
    volume: defaultVolume
  };

  _volumeListener = data => this._updateVolume(data.value);

  _updateVolume(volume: number) {
    if (this._isMounted) {
      this.setState(() => ({
        volume
      }));
    }

    defaultVolume = volume;
  }

  componentWillUnmount() {
    this._isMounted = false;

    SystemSetting.removeVolumeListener(this._unSub);
  }
  componentDidMount() {
    this._unSub = SystemSetting.addVolumeListener(this._volumeListener);

    this._isMounted = true;
  }

  _onSeek = percent => {
    SystemSetting.setVolume(percent);
    this._updateVolume(percent);
  };

  render() {
    return (
      <ProgressBar
        {...this.props}
        onSeek={this._onSeek}
        progress={this.state.volume}
      />
    );
  }
}

export default VolumeProgressBar;
