// @flow
import React from "react";
import { compose } from "ramda";
import { withHandlers, withPropsOnChange, withStateHandlers } from "recompose";

export default function withLazyRenderList({ limit }: {| limit: number |}) {
  const initialState = { chunk: 1 };

  return compose(
    withStateHandlers(initialState, {
      resetChunk: () => () => initialState,
      incrementChunk: ({ chunk }, { data }) => () => ({
        chunk: Math.round(data.length / limit) >= chunk ? chunk + 1 : chunk
      })
    }),
    withPropsOnChange(["data"], ({ resetChunk }) => {
      resetChunk();

      return {};
    }),
    withHandlers({
      onEndReached: ({ incrementChunk }) => () => incrementChunk()
    }),
    withPropsOnChange(["chunk"], ({ data, chunk }) => ({
      data: data.slice(0, limit * chunk)
    }))
  );
}
