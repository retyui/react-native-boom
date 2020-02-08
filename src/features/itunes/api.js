// @flow

const encode = (str: string): string => str.trim().replace(/ /g, "+");

export const searchMusicTrack = ({
  title,
  author
}: {|
  title: string,
  author: string
|}) =>
  fetch(
    `https://itunes.apple.com/search?term=${encode(
      `${author} ${title}`
    )}&entity=musicTrack`
  ).then(res => res.json());
