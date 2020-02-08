// @flow

export function makeChunkArray<T: *>(
  arr: Array<T>,
  len: number
): Array<Array<T>> {
  var chunks = [],
    i = 0,
    n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }

  return chunks;
}
