// @flow
import React, { Component, type ComponentType } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  getTaskError,
  isTaskRunning,
  isTaskFinished
} from "../features/tasks/selectors";
import { createId } from "../features/tasks/utils";

const mapStateToProps = (state, { taskId }) => ({
  error: getTaskError(state, taskId),
  isLoading: isTaskRunning(state, taskId),
  isFinished: isTaskFinished(state, taskId)
});

type Options = {|
  runnerMethod: string
|};

export type WithAsyncRunnerProps = $ReadOnly<{|
  error: ?Error,
  isLoading: boolean,
  isFinished: boolean,
  taskId: ?string
|}>;

const withAsyncRunner = ({ runnerMethod }: Options) => <P: Object>(
  WrapperComponent: ComponentType<P>
): ComponentType<$Diff<P, WithAsyncRunnerProps>> => {
  const ConnectedComponent = connect(mapStateToProps)(WrapperComponent);

  class WithAsyncRunner extends Component<
    WithAsyncRunnerProps & P,
    { taskId: ?string }
  > {
    static propTypes = {
      [runnerMethod]: PropTypes.func.isRequired
    };

    state = {
      taskId: null
    };

    render() {
      const runnerProps = {
        [runnerMethod]: this.runTask
      };

      return (
        <ConnectedComponent {...this.props} {...this.state} {...runnerProps} />
      );
    }

    runTask = (...args) => {
      const { [runnerMethod]: runner } = this.props;

      const action = runner(...args);

      this.setState({ taskId: createId(action) });

      return action;
    };
  }

  return WithAsyncRunner;
};

export default withAsyncRunner;
