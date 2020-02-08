// @flow
import React, { Component } from "react";
import { View } from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";

import Text from "../../Text";
import Image from "../../Image";
import TrackProgressBar from "../../TrackProgressBar";
import CircleButton from "../../CircleButton";
import CacheProgress from "../../CacheProgress";
import VolumeProgressBar from "../../VolumeProgressBar/component";

import styles from "./styles";

import type { Props } from "./types";

class TrackInfo extends Component<Props> {
  _renderAddToMyAudioBtn() {
    const { isAddedToMyAudios } = this.props;

    if (isAddedToMyAudios) {
      return (
        <CircleButton>
          <Icon name="playlist-add-check" size={25} color="#000" />
        </CircleButton>
      );
    }

    return (
      <CircleButton>
        <Icon name="playlist-add" size={25} color="#000" />
      </CircleButton>
    );
  }

  _renderCacheThisTrack() {
    const { isCached } = this.props;
    if (isCached) {
      return <CacheProgress />;
    }

    return (
      <CircleButton>
        <Icon name="done" size={25} color="#000" />
      </CircleButton>
    );
  }

  _renderInfo() {
    const { title, author } = this.props;
    return (
      <View style={styles.textInfoBox}>
        <View style={styles.textInfoIconCell}>
          {this._renderAddToMyAudioBtn()}
        </View>
        <View style={styles.textInfoTextCell}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
          <Text
            style={styles.author}
            numberOfLines={1}
            ellipsizeMode="tail"
          >{`${author} — ${title}`}</Text>
        </View>
        <View style={styles.textInfoIconCell}>
          {this._renderCacheThisTrack()}
        </View>
      </View>
    );
  }

  _renderControls() {
    const {
      isPlayerPlaying,
      playerPause,
      playerNext,
      playerPrev,
      playerPlay
    } = this.props;

    return (
      <View style={styles.controlWrap}>
        <View style={styles.controlCell}>
          <CircleButton>
            <Icon name="repeat" size={25} color="#000" />
          </CircleButton>
        </View>
        <View style={styles.controlCell}>
          <CircleButton size={56} onPress={playerPrev}>
            <Icon name="skip-previous" size={50} color="#000" />
          </CircleButton>
        </View>
        <View style={styles.controlCell}>
          {isPlayerPlaying ? (
            <CircleButton size={56} onPress={playerPause}>
              <Icon name="pause" size={50} color="#000" />
            </CircleButton>
          ) : (
            <CircleButton size={56} onPress={playerPlay}>
              <Icon name="play-arrow" size={50} color="#000" />
            </CircleButton>
          )}
        </View>
        <View style={styles.controlCell}>
          <CircleButton size={56} onPress={playerNext}>
            <Icon name="skip-next" size={50} color="#000" />
          </CircleButton>
        </View>
        <View style={styles.controlCell}>
          <CircleButton>
            <Icon name="shuffle" size={25} color="#000" />
          </CircleButton>
        </View>
      </View>
    );
  }

  _renderVolumeControls() {
    return (
      <View style={styles.volumeRow}>
        <CircleButton size={40}>
          <Icon name="settings" size={18} color="#000" />
        </CircleButton>
        <View style={styles.volumeBox}>
          <Icon name="volume-mute" size={10} style={styles.volumeIcon} />
          <VolumeProgressBar />
          <Icon name="volume-up" size={10} style={styles.volumeIcon} />
        </View>
        <View style={styles.volumeEmptyIcon} />
      </View>
    );
  }

  render() {
    const { playerSeekTo, smallImageSource, bigImageSource } = this.props;

    return (
      <View style={styles.root}>
        <View style={styles.imgWrap}>
          <Image source={smallImageSource} style={styles.img} />
          {Boolean(bigImageSource) && (
            <Image source={bigImageSource} style={styles.bigImg} />
          )}
        </View>
        <TrackProgressBar onSeek={playerSeekTo} />
        {this._renderInfo()}
        {this._renderControls()}
        {this._renderVolumeControls()}
      </View>
    );
  }
}

export default TrackInfo;
