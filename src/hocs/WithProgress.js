// @flow
import React, { Component, type ComponentType } from "react";
import TrackPlayer from "react-native-track-player";

type State = {|
  position: number,
  bufferedPosition: number,
  duration: number
|};

export type ProgressProps = $ReadOnly<{|
  position: number,
  duration: number,
  bufferedPosition: number,
  getProgress: () => number,
  getBufferedProgress: () => number,
  updatePosition: number => void
|}>;

const withProgress = ({ delayUpdate }: { delayUpdate: number }) => <P: Object>(
  WrappedComponent: ComponentType<P>
): ComponentType<$Diff<P, ProgressProps>> => {
  class WithProgress extends Component<P, State> {
    _progressUpdates: boolean = false;
    _timer: IntervalID;
    state = {
      position: 0,
      bufferedPosition: 0,
      duration: 0
    };

    componentDidMount() {
      this._progressUpdates = true;

      this._updateProgress();

      this._timer = setInterval(this._updateProgress, delayUpdate);
    }

    componentWillUnmount() {
      this._progressUpdates = false;

      clearInterval(this._timer);
    }

    _updateProgress = async () => {
      try {
        const data = {
          position: await TrackPlayer.getPosition(),
          bufferedPosition: await TrackPlayer.getBufferedPosition(),
          duration: await TrackPlayer.getDuration()
        };

        if (this._progressUpdates) {
          this.setState(() => data);
        }
      } catch (e) {}
    };

    updatePosition = (pos: number) => {
      this.setState(() => ({
        position: pos
      }));
    };

    getProgress = () => {
      if (!this.state.duration || !this.state.position) return 0;

      return this.state.position / this.state.duration;
    };

    getBufferedProgress = () => {
      if (!this.state.duration || !this.state.bufferedPosition) return 0;

      return this.state.bufferedPosition / this.state.duration;
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          getBufferedProgress={this.getBufferedProgress}
          getProgress={this.getProgress}
          updatePosition={this.updatePosition}
        />
      );
    }
  }

  return WithProgress;
};

export default withProgress;
