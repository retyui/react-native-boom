// @flow
import { createAction, type ActionType } from "redux-actions";

import {
  SYNC_MY_AUDIO,
  FETCH_ALL_MY_AUDIO_SUCCESS,
  INITIAL_FETCH_MY_AUDIO_SUCCESS
} from "./actionTypes";
import createTaskAction from "../tasks/createTaskAction";
import type { ApiMyAudiosResponse } from "./types";

const id = Math.random();

export const syncMyAudio = createTaskAction(SYNC_MY_AUDIO, null, () => id);

export const initialFetchMyAudioSuccess = createAction(
  INITIAL_FETCH_MY_AUDIO_SUCCESS,
  (v: ApiMyAudiosResponse) => v
);

export const fetchAllMyAudioSuccess = createAction(
  FETCH_ALL_MY_AUDIO_SUCCESS,
  (v: ApiMyAudiosResponse) => v
);

export type InitialFetchSuccessActionType = ActionType<
  typeof initialFetchMyAudioSuccess
>;
export type FetchAllSuccessActionType = ActionType<
  typeof fetchAllMyAudioSuccess
>;
