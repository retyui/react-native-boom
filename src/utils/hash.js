// @flow
import sha256 from "hash.js/lib/hash/sha/256";

export const createHash = (str: string): string =>
  sha256()
    .update(str)
    .digest("hex")
    .slice(0, 22);
