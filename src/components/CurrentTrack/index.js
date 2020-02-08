// @flow
import React from "react";
import { compose } from "ramda";
import { connect } from "react-redux";

import {
  getTrackAuthor,
  getTrackSmallImageSource,
  getTrackTitle
} from "../../features/audio/selectors";
import {
  getCurrentTrackId,
  isPlayerPlaying
} from "../../features/player/selectors";
import { playerPause, playerPlay } from "../../features/player/actions";
import { setBottomTabsVisible } from "../../features/navigation/actions";

import CurrentTrack from "./component";

export default compose(
  connect(
    state => {
      const currentTrackId = getCurrentTrackId(state);

      return {
        currentTrackId,
        isPlaying: isPlayerPlaying(state),
        author: getTrackAuthor(state, currentTrackId),
        imageSource: getTrackSmallImageSource(state, currentTrackId),
        title: getTrackTitle(state, currentTrackId)
      };
    },
    {
      playerPlay,
      playerPause,
      setBottomTabsVisible
    }
  )
)(CurrentTrack);
