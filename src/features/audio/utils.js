// @flow
import { concat, filter, fromPairs, map, path, pipe, toPairs } from "ramda";

import { audioUnmaskSource } from "../../vkMagic";

import type {
  ApiMyAudiosResponse,
  ApiPlaylistData,
  ApiPlaylistIds
} from "./types";
import type {
  FetchAllSuccessActionType,
  InitialFetchSuccessActionType
} from "./actions";

const Be = {
  AUDIO_ITEM_INDEX_ID: 0,
  AUDIO_ITEM_INDEX_OWNER_ID: 1,
  AUDIO_ITEM_INDEX_URL: 2,
  AUDIO_ITEM_INDEX_TITLE: 3,
  AUDIO_ITEM_INDEX_PERFORMER: 4,
  AUDIO_ITEM_INDEX_DURATION: 5,
  AUDIO_ITEM_INDEX_ALBUM_ID: 6,
  AUDIO_ITEM_INDEX_AUTHOR_LINK: 8,
  AUDIO_ITEM_INDEX_LYRICS: 9,
  AUDIO_ITEM_INDEX_FLAGS: 10,
  AUDIO_ITEM_INDEX_CONTEXT: 11,
  AUDIO_ITEM_INDEX_EXTRA: 12,
  AUDIO_ITEM_INDEX_HASHES: 13,
  AUDIO_ITEM_INDEX_COVER_URL: 14,
  AUDIO_ITEM_INDEX_ADS: 15,
  AUDIO_ITEM_INDEX_SUBTITLE: 16,
  AUDIO_ITEM_INDEX_MAIN_ARTISTS: 17,
  AUDIO_ITEM_INDEX_FEAT_ARTISTS: 18,
  AUDIO_ITEM_INDEX_ALBUM: 19,
  AUDIO_ITEM_INDEX_TRACK_CODE: 20,
  AUDIO_ITEM_INDEX_RESTRICTION: 21,
  AUDIO_ITEM_INDEX_ALBUM_PART: 22,
  AUDIO_ITEM_ACCESS_KEY: 24,
  AUDIO_ITEM_HAS_LYRICS_BIT: 1,
  AUDIO_ITEM_CAN_ADD_BIT: 2,
  AUDIO_ITEM_CLAIMED_BIT: 4,
  AUDIO_ITEM_HQ_BIT: 16,
  AUDIO_ITEM_LONG_PERFORMER_BIT: 32,
  AUDIO_ITEM_UMA_BIT: 128,
  AUDIO_ITEM_REPLACEABLE: 512,
  AUDIO_ITEM_EXPLICIT_BIT: 1024,
  AUDIO_ENOUGH_LOCAL_SEARCH_RESULTS: 500,
  AUDIO_RECOMS_TYPE_LISTENED: "recoms6",
  AUDIO_PLAYING_CLS: "audio_row__playing",
  AUDIO_CURRENT_CLS: "audio_row__current",
  AUDIO_DURATION_CLS: "audio_row__duration",
  AUDIO_LAYER_HEIGHT: 550,
  AUDIO_LAYER_MIN_WIDTH: 400,
  AUDIO_LAYER_MAX_WIDTH: 1e3,
  AUDIO_HQ_LABEL_CLS: "audio_hq_label_show",
  AUDIO_MAX_AUDIOS_IN_SNIPPET: 5,
  AUDIO_ROW_COVER_SIZE: 40,
  AUDIO_ROW_PLAY_SIZE: 24,
  AUDIO_ROW_ACTION_ROW_ITEM:
    '<a role="button" class="audio_row__more_action audio_row__more_action_%0% _audio_row__more_action_%0% %3%">%2%</a>',
  LOG_LS_KEY: "audiolog"
};

function intval(e) {
  return !0 === e ? 1 : parseInt(e) || 0;
}

const makeHumanReadableTrackObject = e => {
  var t = (e[Be.AUDIO_ITEM_INDEX_HASHES] || "").split("/"),
    n = (e[Be.AUDIO_ITEM_INDEX_COVER_URL] || "").split(",");

  return {
    id: intval(e[Be.AUDIO_ITEM_INDEX_ID]),
    owner_id: intval(e[Be.AUDIO_ITEM_INDEX_OWNER_ID]),
    ownerId: e[Be.AUDIO_ITEM_INDEX_OWNER_ID],
    fullId: e[Be.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + e[Be.AUDIO_ITEM_INDEX_ID],
    title: e[Be.AUDIO_ITEM_INDEX_TITLE] || "",
    subTitle: e[Be.AUDIO_ITEM_INDEX_SUBTITLE],
    performer: e[Be.AUDIO_ITEM_INDEX_PERFORMER],
    duration: intval(e[Be.AUDIO_ITEM_INDEX_DURATION]),
    lyrics: intval(e[Be.AUDIO_ITEM_INDEX_LYRICS]),
    url: e[Be.AUDIO_ITEM_INDEX_URL],
    flags: e[Be.AUDIO_ITEM_INDEX_FLAGS],
    context: e[Be.AUDIO_ITEM_INDEX_CONTEXT],
    extra: e[Be.AUDIO_ITEM_INDEX_EXTRA],
    accessKey: e[Be.AUDIO_ITEM_ACCESS_KEY],
    addHash: t[0] || "",
    editHash: t[1] || "",
    actionHash: t[2] || "",
    deleteHash: t[3] || "",
    replaceHash: t[4] || "",
    urlHash: t[5] || "",
    restoreHash: t[6] || "",
    canEdit: !!t[1],
    canDelete: !!t[3],
    isLongPerformer:
      e[Be.AUDIO_ITEM_INDEX_FLAGS] & Be.AUDIO_ITEM_LONG_PERFORMER_BIT,
    canAdd: !!(e[Be.AUDIO_ITEM_INDEX_FLAGS] & Be.AUDIO_ITEM_CAN_ADD_BIT),
    coverUrl_s: n[0],
    coverUrl_p: n[1],
    isClaimed: !!(e[Be.AUDIO_ITEM_INDEX_FLAGS] & Be.AUDIO_ITEM_CLAIMED_BIT),
    isExplicit: !!(e[Be.AUDIO_ITEM_INDEX_FLAGS] & Be.AUDIO_ITEM_EXPLICIT_BIT),
    isUMA: !!(e[Be.AUDIO_ITEM_INDEX_FLAGS] & Be.AUDIO_ITEM_UMA_BIT),
    isReplaceable: !!(e[Be.AUDIO_ITEM_INDEX_FLAGS] & Be.AUDIO_ITEM_REPLACEABLE),
    album: e[Be.AUDIO_ITEM_INDEX_ALBUM],
    albumId: intval(e[Be.AUDIO_ITEM_INDEX_ALBUM_ID]),
    albumPart: intval(e[Be.AUDIO_ITEM_INDEX_ALBUM_PART]),
    trackCode: e[Be.AUDIO_ITEM_INDEX_TRACK_CODE],
    restrictionStatus: e[Be.AUDIO_ITEM_INDEX_RESTRICTION]
  };
};

const getTrackSrcProp = path([1, Be.AUDIO_ITEM_INDEX_URL]);

const getUnmaskSourceFn = (userId: string) => (track: Array<mixed>) => {
  const unmaskSource = audioUnmaskSource(userId, getTrackSrcProp(track));

  track[1][2] = unmaskSource;

  return track;
};

const filterAudioWithSrc = filter((track: Array<mixed>) =>
  Boolean(getTrackSrcProp(track))
);

export class FetchMyAudiosContext {
  _ids: ApiPlaylistIds;
  _audios: ApiPlaylistData;
  _unMaskSource: Function;
  _offset: number;

  constructor(userId: string) {
    this._offset = 0;
    this._ids = [];
    this._audios = {};
    this._unMaskSource = getUnmaskSourceFn(userId);
  }

  appendChunk = (res: ApiMyAudiosResponse) => {
    if (FetchMyAudiosContext.isNotEmptyResponse(res)) {
      this._appendAudios(res.playlistData);
      this._appendIds(res.playlistIds);

      this._offset = this._offset + res.playlistIds.length;
    }
  };

  getData = () => {
    return {
      playlistIds: [...this._ids],
      playlistData: { ...this._audios }
    };
  };

  getOffset = () => {
    return this._offset;
  };

  _appendIds(ids: ApiPlaylistIds) {
    const newIds = concat(this._ids, ids);

    this._ids = filter(id => Boolean(this._audios[id]), newIds);
  }

  _appendAudios(audios: ApiPlaylistData) {
    const decodedAudios = map(this._unMaskSource, filterAudioWithSrc(audios));

    this._audios = { ...this._audios, ...decodedAudios };
  }

  static isNotEmptyResponse(res: ApiMyAudiosResponse) {
    return res && Array.isArray(res.playlistIds) && res.playlistIds.length > 0;
  }
}

type Action = FetchAllSuccessActionType | InitialFetchSuccessActionType;

export const createOnFetchSuccessReducer = (filterFn: Function) => (
  state: Object,
  action: Action
) => {
  const {
    payload: { playlistData }
  } = action;
  const filteredState = pipe(
    toPairs,
    filter(([id, track]) => filterFn(id, track, action)),
    fromPairs
  )(state);
console.log(' --- xdebug playlistData', playlistData)
  return pipe(
    toPairs,
    map(([id, track]) => [
      id,
      {
        ...filteredState[id],
        ...makeHumanReadableTrackObject(track[1])
      }
    ]),
    fromPairs
  )(playlistData);
};

export const makeShortId = (id: string): string => {
  try {
    return id.split("_")[1].slice(-3);
  } catch (e) {
    return id;
  }
};
