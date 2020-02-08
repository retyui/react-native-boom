// @flow
// $FlowFixMe
import { prop, anyPass, toLower, pipe, map, includes } from "ramda";

const artistsMap = {
  Монеточка: "Monetochka"
};

export const isValidTrack = (vkTrack: Object, itunesTrack: Object): boolean => {
  const { author, title } = pipe(
    e => {
      e.author = artistsMap[e.author] || e.author;

      return e;
    },
    map(toLower)
  )(vkTrack);

  const artistName = pipe(
    prop("artistName"),
    includes(author)
  );
  const trackName = pipe(
    prop("trackName"),
    includes(title)
  );

  const check = pipe(
    map(toLower),
    anyPass([artistName, trackName])
  );

  return check(itunesTrack);
};
