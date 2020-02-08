// @flow
import TrackPlayer from "react-native-track-player";
import { buffers, type Effect, eventChannel } from "redux-saga";
import { indexOf, map, prop, splitAt, toPairs } from "ramda";
import {
  call,
  fork,
  put,
  select,
  take,
  takeLatest,
  throttle
} from "redux-saga/effects";

import { createErrorBoundary } from "../analytics/sagas";
import { getTrackDate } from "../audio/selectors";
import { eventToActionMap } from "./actions";
import {
  PLAYBACK_END,
  PLAYER_NEXT,
  PLAYER_PAUSE,
  PLAYER_PLAY,
  PLAYER_PLAY_TRACK,
  PLAYER_PREV,
  PLAYER_SEEK_TO,
  PLAYER_STOP
} from "./actionTypes";
import {
  getNextOrFirstTrackId,
  getPrevOrLastTrackId,
  isInfinityMode
} from "./selectors";

import { DEAUTHORIZE } from "../auth/actionTypes";

TrackPlayer.registerPlaybackService(() => async d =>
  console.log(" --- registerPlaybackService", d)
);

const createPlayerEventChannel = () =>
  eventChannel(emit => {
    const subscribes = toPairs(eventToActionMap).map(([type, actionCreator]) =>
      TrackPlayer.addEventListener(type, event => emit(actionCreator(event)))
    );

    return () => {
      subscribes.map(subscribe => subscribe.remove());
    };
  });

const initPlayer = createErrorBoundary(function* _initPlayer() {
  if (process.env.NODE_ENV !== "production") {
    yield call(TrackPlayer.destroy);
  }

  yield call(TrackPlayer.setupPlayer);
  yield call(TrackPlayer.updateOptions, {
    // Whether the player should stop running when the app is closed on Android
    stopWithApp: false,

    // An array of media controls capabilities
    capabilities: [
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_SEEK_TO,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      TrackPlayer.CAPABILITY_JUMP_FORWARD,
      TrackPlayer.CAPABILITY_JUMP_BACKWARD,
      TrackPlayer.CAPABILITY_STOP
    ],

    // An array of capabilities that will show up when the notification is in the compact form on Android
    compactCapabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS
    ]
  });

  return true;
});

const transformToArrayIds: (Array<{ id: string }>) => Array<string> = map(
  prop("id")
);

const sortQueue = (trackIds: Array<string>, trackId: string): Array<string> => {
  const index = indexOf(trackId, trackIds);

  const [begin, end] = splitAt(index, trackIds);

  return [...end, ...begin];
};

const playTrack = createErrorBoundary(function* _playTrack({
  payload: { trackIds, trackId }
}) {
  const tracks = [];

  for (const id of sortQueue(trackIds, trackId)) {
    const { src, cachedUri, ...trackData } = yield select(getTrackDate, id);

    tracks.push({
      ...trackData,
      id,
      url: cachedUri || src
    });
  }

  yield call(TrackPlayer.reset);
  yield call(TrackPlayer.add, tracks);
  yield call(TrackPlayer.skip, trackId);
  yield call(TrackPlayer.play);
});

const wrapTrackPlayerMethod = method =>
  createErrorBoundary(function* _wrappedMethod() {
    return yield call([TrackPlayer, TrackPlayer[method]]);
  });

function* initPlayerChannel() {
  const ch = createPlayerEventChannel();

  while (true) {
    const action = yield take(ch);

    yield put(action);
  }
}

function* onPlayBackEnd() {
  const nextId = yield select(getNextOrFirstTrackId);

  if (nextId) {
    yield call(TrackPlayer.skip, nextId);
    yield call(TrackPlayer.play);
  }
}

function* skipToNext() {
  const isInfinity = yield select(isInfinityMode);

  if (isInfinity) {
    const nextTrackId = yield select(getNextOrFirstTrackId);

    return yield call(TrackPlayer.skip, nextTrackId);
  }
}

function* skipToPrevious() {
  const isInfinity = yield select(isInfinityMode);
  const position = yield call(TrackPlayer.getPosition);
  const prevTrackId = yield select(getPrevOrLastTrackId);

  if (position > 3 && isInfinity) {
    return yield call(TrackPlayer.skip, prevTrackId);
  }

  return yield call(TrackPlayer.seekTo, 0);
}

const DEFAULT_DELAY = 555;

export default function* rootPlayerSaga(): Iterator<Effect> {
  const isReady = yield call(initPlayer);

  if (isReady) {
    yield fork(initPlayerChannel);
    yield takeLatest(PLAYER_PLAY, wrapTrackPlayerMethod("play"));
    yield takeLatest(PLAYER_PAUSE, wrapTrackPlayerMethod("pause"));
    yield takeLatest(PLAYER_STOP, wrapTrackPlayerMethod("stop"));
    yield throttle(DEFAULT_DELAY, PLAYER_NEXT, skipToNext);
    yield throttle(DEFAULT_DELAY, PLAYER_PREV, skipToPrevious);
    yield takeLatest(PLAYER_PLAY_TRACK, playTrack);
    yield takeLatest(PLAYBACK_END, onPlayBackEnd);
    yield takeLatest(PLAYER_SEEK_TO, function*({ payload: seek }) {
      yield call(TrackPlayer.seekTo, seek);
    });

    yield takeLatest(DEAUTHORIZE, function*() {
      yield call(TrackPlayer.reset);
    });
  }
}
