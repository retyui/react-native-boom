// @flow
import React from "react";
import { connect } from "react-redux";
import { mapProps } from "recompose";
import { compose } from "ramda";
import {
  getTrackAuthor,
  getTrackExplicitStatus,
  getTrackSmallImageSource,
  getTrackTitle
} from "../../../features/audio/selectors";

import AudioItem from "./component";

import { isCurrentPlayingTrackId } from "../../../features/player/selectors";
import { playerStop } from "../../../features/player/actions";
import { cacheAudioList } from "../../../features/cache/actions";

const mapDispatchToProps = {
  openTrackMenu: () => ({ type: "xxxx/openTrackMenu" }),
  ___cache: cacheAudioList,
  playerStop
};

const mapStateToProps = (state, { trackId }) => ({
  imageSource: getTrackSmallImageSource(state, trackId),
  title: getTrackTitle(state, trackId),
  author: getTrackAuthor(state, trackId),
  isExplicit: getTrackExplicitStatus(state, trackId),
  isCurrentPlaying: isCurrentPlayingTrackId(state, trackId)
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  mapProps(
    ({
      isCurrentPlaying,
      playerStop,
      openTrackMenu,
      playerPlayTrack,
      ...props
    }) => ({
      ...props,
      onPressMore: () =>
        props.___cache(
          ((...args) => {
            console.log(" --- props.data", props.data.length);
            return args[0];
          })(props.data)
        ),
      onPress: () => {
        if (isCurrentPlaying) {
          return playerStop();
        }

        return playerPlayTrack();
      }
    })
  )
)(AudioItem);
