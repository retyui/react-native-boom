// @flow
import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import AsyncStorage from "@react-native-community/async-storage";

import { persistReducer, persistStore } from "redux-persist";

import { FEATURE_NAME as TASKS } from "../features/tasks/consts";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const config = {
  blacklist: [TASKS],
  key: "root",
  storage: AsyncStorage
};

export default function createReduxStore() {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const saga = createSagaMiddleware();

  // $FlowFixMe
  const store = createStore(
    persistReducer(config, rootReducer),
    composeEnhancers(applyMiddleware(saga))
  );

  const persistor = persistStore(store);

  saga.run(rootSaga);

  return { store, persistor };
}
