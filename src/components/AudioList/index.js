// @flow
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "ramda";
import { mapProps } from "recompose";
import { FlatList } from "react-native";

import { SECTION_ITEM_HEIGHT } from "./AudioItem/consts";
import AudioItem from "./AudioItem";
import MixAllItem from "./MixAllItem";
import CountAudios from "./CountAudios";
import { playerPlayTrack } from "../../features/player/actions";
import withLazyRenderList from "../../hocs/withLazyRender";

const keyExtractor = (id: string): string => id.toString();
const getItemLayout = (data, index) => ({
  length: SECTION_ITEM_HEIGHT,
  offset: SECTION_ITEM_HEIGHT * index,
  index
});

const mapDispatchToProps = {
  playerPlayTrack
};

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withLazyRenderList({ limit: 25 }),
  mapProps(
    ({
      data,
      ListHeaderComponent,
      ListFooterComponent,
      playerPlayTrack,
      ...props
    }) => ({
      ...props,
      data,
      getItemLayout,
      keyExtractor,
      renderItem: ({ item: trackId }) => (
        <AudioItem
          trackId={trackId}
          data={data}
          playerPlayTrack={() => playerPlayTrack(data, trackId)}
        />
      ),
      ListHeaderComponent: () => (
        <Fragment>
          {Boolean(ListHeaderComponent) && ListHeaderComponent()}
          {data.length > 2 && <MixAllItem />}
        </Fragment>
      ),
      ListFooterComponent: () => (
        <Fragment>
          {data.length > 0 && <CountAudios count={data.length} />}
          {Boolean(ListFooterComponent) && ListFooterComponent()}
        </Fragment>
      )
    })
  )
)(FlatList);
