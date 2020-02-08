// @flow

import type { Source } from "../../../types";

export type Props = $ReadOnly<{|
  currentTrackId: string,
  isPlayerPlaying: boolean,
  isCached: boolean,
  playerPause: () => void,
  playerNext: () => void,
  playerPrev: () => void,
  playerPlay: () => void,
  playerSeekTo: number => void,
  smallImageSource: Source,
  bigImageSource: Source,
  title: string,
  author: string,
  isAddedToMyAudios: boolean
|}>;
