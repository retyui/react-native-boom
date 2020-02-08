// @flow
import { spawn } from "redux-saga/effects";
import rootAudio from "../features/audio/sagas";
import netInfo from "../features/netInfo/sagas";
import cache from "../features/cache/sagas";
import player from "../features/player/sagas";
import navigation from "../features/navigation/sagas";
import app from "../features/app/sagas";
import auth from "../features/auth/sagas";
import itunes from "../features/itunes/sagas";

export default function* rootSaga(): Iterator<any> {
  yield spawn(auth);
  yield spawn(app);
  yield spawn(navigation);

  yield spawn(itunes);
  yield spawn(rootAudio);
  yield spawn(netInfo);
  yield spawn(cache);
  yield spawn(player);
}
