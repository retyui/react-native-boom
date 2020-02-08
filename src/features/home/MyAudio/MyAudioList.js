// @flow
import React from "react";
import { connect } from "react-redux";
import { compose } from "ramda";
import { mapProps } from "recompose";
import { RefreshControl } from "react-native";

import { getAudiosIds } from "../../audio/selectors";
import { syncMyAudio } from "../../audio/actions";
import AudioList from "../../../components/AudioList";
import withAsyncRunner from "../../../hocs/withAsyncRunner";

const mapStateToProps = state => ({
  data: getAudiosIds(state)
});

const runnerMethod = "onRefresh";

const mapDispatchToProps = {
  [runnerMethod]: syncMyAudio
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withAsyncRunner({ runnerMethod }),
  mapProps(({ isLoading, onRefresh, ...props }) => ({
    ...props,
    refreshControl: (
      <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
    )
  }))
)(AudioList);
