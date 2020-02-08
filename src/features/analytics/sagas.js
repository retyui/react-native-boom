// @flow
import { always, tryCatch } from "ramda";
import analytics from "@react-native-firebase/analytics";
import { call } from "redux-saga/effects";

export const safeSerialize = tryCatch(JSON.stringify, always("<UNSERIALIZED>"));

export const serializeError = (error: Object): string =>
  error && error.isAxiosError
    ? `NetworkError: ${safeSerialize(error)}`
    : error.toString();

export function createErrorBoundary(saga: Function): Function {
  const { name: sagaName } = saga;

  function* handleError(args, error) {
    const errorMessage = serializeError(error);
    const serializedArgs = args.map(safeSerialize).join(", ");
    const description = `${errorMessage} (occurred in ${sagaName} called with arguments ${serializedArgs})`;

    yield call(trackException, description);
  }

  return function* errorBoundary(...args): Iterator<any> {
    try {
      return yield* saga(...args);
    } catch (error) {
      if (process.env.NODE_ENV === "production") {
        yield* handleError(args, error);
      } else {
        // eslint-disable-next-line no-console
        console.warn(error);
      }
    }
  };
}

export function* trackException(error: Error, fatal?: boolean): Iterator<any> {
  yield call([analytics, analytics.logEvent], "ERROR", {
    error,
    fatal
  });
}
