// @flow
import { type Saga } from "redux-saga";
import { call, takeEvery, select, put } from "redux-saga/effects";

import { createErrorBoundary } from "../analytics/sagas";

import { searchMusicTrack } from "./api";
import {
  getTrackAuthor,
  getTrackTitle,
  canUseItunesSearch
} from "../audio/selectors";
import { downloadImage } from "../../components/Image/fs";
import { PLAYER_PLAY_TRACK } from "../player/actionTypes";
import { notFound, updateTrackImage } from "./actions";
import { isValidTrack } from "./utils";
import { getImageSize } from "../settings/selectors";

function* onPlayTrack({ payload: { trackId } }) {
  const canUseItunes = yield select(canUseItunesSearch, trackId);
  if (!canUseItunes) {
    return;
  }

  const title = yield select(getTrackTitle, trackId);
  const author = yield select(getTrackAuthor, trackId);

  if (title && author) {
    const imageSize = yield select(getImageSize);
    const result = yield call(searchMusicTrack, {
      title,
      author
    });

    for (const { artistName, trackName, artworkUrl100 } of result.results) {
      if (
        isValidTrack(
          {
            title,
            author
          },
          { artistName, trackName }
        )
      ) {
        const artworkUrl = artworkUrl100.replace("100x100", imageSize);

        yield call(downloadImage, artworkUrl);

        return yield put(
          updateTrackImage({
            trackId,
            uri: artworkUrl,
            smallUri: artworkUrl100
          })
        );
      }

      // console.log(
      //   " --- [ITUNES] CUN NOT EQUAL",
      //   `artistName: ${artistName} !== ${author}`,
      //   `trackName: ${trackName} !== ${title}`
      // );
    }

    return yield put(notFound(trackId));
  }
}

export default function* rootItunesSaga(): Saga<void> {
  yield takeEvery(PLAYER_PLAY_TRACK, createErrorBoundary(onPlayTrack));
}
