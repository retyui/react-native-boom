// @flow
import React from "react";
import { Text, TouchableNativeFeedback, View } from "react-native";
import Image from "../../Image/index";
import CacheProgress from "../../CacheProgress";

import AnimatedPlayState from "./AnimatedPlayState";
import styles from "./styles";

type Props = $ReadOnly<{
  imageSource: any,
  title: string,
  author: string,
  onPress: Function,
  onPressMore: Function,
  isExplicit: boolean,
  trackId: string
}>;

export default function AudioItem({
  imageSource,
  title,
  author,
  onPress,
  onPressMore,
  isExplicit,
  trackId,
}: Props) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.root}>
        <View style={styles.imageWrap}>
          <Image source={imageSource} style={styles.image} fadeDuration={0} />
          <AnimatedPlayState trackId={trackId}/>
        </View>
        <View style={styles.textBox}>
          <View style={styles.titleWrap}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {title}
            </Text>
            {Boolean(isExplicit) && <Text style={styles.explicit}>e</Text>}
          </View>
          <Text style={styles.author} numberOfLines={1} ellipsizeMode="tail">
            {author}
          </Text>
        </View>
        <CacheProgress trackId={trackId} />
        <View style={styles.moreWrap}>
          <TouchableNativeFeedback onPress={onPressMore}>
            <View style={styles.more}>
              <View style={[styles.dot, styles.dotBottom]} />
              <View style={[styles.dot, styles.dotBottom]} />
              <View style={styles.dot} />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}
