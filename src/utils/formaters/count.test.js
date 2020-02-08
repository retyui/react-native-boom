// @flow
import { formatAudioCount } from "./count";

test("Test", () => {
  expect(formatAudioCount(0)).toBe("Аудиозаписей");
  expect(formatAudioCount(5)).toBe("Аудиозаписей");
  expect(formatAudioCount(6)).toBe("Аудиозаписей");
  expect(formatAudioCount(14)).toBe("Аудиозаписей");
  expect(formatAudioCount(1)).toBe("Аудиозапись");
  expect(formatAudioCount(2)).toBe("Аудиозаписи");
});
