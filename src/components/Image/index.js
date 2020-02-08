// @flow
import React, { type ElementConfig } from "react";
import { Image } from "react-native";

import { getCachedSource } from "./fs";

type Props = $ReadOnly<{|
  ...$Exact<ElementConfig<typeof Image>>,
  useCache?: boolean
|}>;

function ImageWithCache({ useCache, source, ...props }: Props) {
  return (
    <Image {...props} source={useCache ? getCachedSource(source) : source} />
  );
}

ImageWithCache.defaultProps = {
  useCache: true
};

export default ImageWithCache;
