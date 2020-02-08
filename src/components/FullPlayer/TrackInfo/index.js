// @flow
import React from "react";
import { connect } from "react-redux";
import {
  getTrackAuthor,
  getTrackExplicitStatus,
  getTrackSmallImageSource,
  getBigItunesImageSource,
  getTrackTitle
} from "../../../features/audio/selectors";

import {
  getCurrentTrackId,
  isPlayerPlaying
} from "../../../features/player/selectors";
import {
  playerNext,
  playerPause,
  playerPlay,
  playerPrev,
  playerSeekTo
} from "../../../features/player/actions";
import { isTrackCached } from "../../../features/cache/selectors";

import TrackInfo from "./component";

const mapState = state => {
  const currentTrackId = getCurrentTrackId(state);

  return {
    currentTrackId,
    smallImageSource: getTrackSmallImageSource(state, currentTrackId),
    bigImageSource: getBigItunesImageSource(state, currentTrackId),
    title: getTrackTitle(state, currentTrackId),
    author: getTrackAuthor(state, currentTrackId),
    isExplicit: getTrackExplicitStatus(state, currentTrackId),
    isCached: isTrackCached(state, currentTrackId),
    isPlayerPlaying: isPlayerPlaying(state)
  };
};

const mapDispatch = {
  playerPause,
  playerNext,
  playerSeekTo,
  playerPrev,
  playerPlay
};

export default connect(
  mapState,
  mapDispatch
)(TrackInfo);
