// @flow
import { applySpec, path } from "ramda";
import type { ApiMyAudiosResponse } from "./types";

const PAYLOAD_OBJ = "data";
const SORTED_AUDIO_IDS = 1;
const AUDIO_DATA = 0;

const extractAudioInfo = applySpec({
  playlistIds: path([PAYLOAD_OBJ, SORTED_AUDIO_IDS]),
  playlistData: path([PAYLOAD_OBJ, AUDIO_DATA])
});

export const fetchUserAudios = (
  userId: number,
  offset: number
): Promise<ApiMyAudiosResponse> =>
  fetch(`https://m.vk.com/audios${userId}`, {
    credentials: "include",
    headers: {
      accept: "*/*",
      "content-type": "application/x-www-form-urlencoded",
      "x-requested-with": "XMLHttpRequest"
    },
    referrer: "https://m.vk.com/audio",
    referrerPolicy: "no-referrer-when-downgrade",
    body: `_ajax=1&offset=${offset}`,
    method: "POST",
    mode: "cors"
  })
    .then(res => res.json())
    .then(data => extractAudioInfo(data));
