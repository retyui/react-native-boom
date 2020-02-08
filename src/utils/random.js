// @flow

export const randomMinMax = (min: number, max: number): number =>
  min + Math.floor(Math.random() * (max + 1 - min));
