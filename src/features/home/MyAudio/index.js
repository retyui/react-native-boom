// @flow
import React from "react";
import { connect } from "react-redux";
import { compose } from "ramda";

import { hasCurrentTrack } from "../../player/selectors";
import withNavigation from "../../../hocs/withNavigation";
import withCurrentTrack from "../../../hocs/WithCurrentTrack";

import MyAudio from "./component";

const mapStateToProps = state => ({
  hasPlayedTrack: hasCurrentTrack(state)
});

export default compose(
  withNavigation(),
  connect(mapStateToProps),
  withCurrentTrack()
)(MyAudio);
