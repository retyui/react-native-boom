// @flow
import React from "react";
import { connect } from "react-redux";
import { compose } from "ramda";
import { renderNothing, branch } from "recompose";

import AnimatedPlayState from "./component";

import {
  isCurrentTrackId,
  isPlayerPlaying
} from "../../../../features/player/selectors";

export default compose(
  connect((state, { trackId }) => ({
    isPlayerPlaying: isPlayerPlaying(state),
    isNotCurrentTrackId: !isCurrentTrackId(state, trackId)
  })),
  branch(({ isNotCurrentTrackId }) => isNotCurrentTrackId, renderNothing)
)(AnimatedPlayState);
