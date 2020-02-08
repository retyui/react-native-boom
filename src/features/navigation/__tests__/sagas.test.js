import { Navigation } from 'react-native-navigation';
import { call, put, select, spawn, take } from 'redux-saga/effects';

import rootSaga, {
  createNavigationChannel,
  push,
  setRoot,
  watchNavigationChannel,
  watchScreenActions,
} from '../sagas';
import { getComponentId } from '../selectors';

describe('push', () => {
  test('should get componentId', () => {
    const action = { payload: { name: 'Another' } };
    const saga = push(action);

    expect(saga.next().value).toEqual(select(getComponentId));
  });

  test('then should should delegate call to Navigation', () => {
    const action = { payload: { name: 'Another' } };
    const saga = push(action);
    const componentId = 'Component123';

    saga.next();

    expect(saga.next(componentId).value).toEqual(
      call([Navigation, Navigation.push], componentId, action.payload),
    );
    expect(saga.next().done).toBe(true);
  });
});

describe('setRoot', () => {
  test('should delegate call to Navigation', () => {
    const action = { payload: { name: '123' } };
    const saga = setRoot(action);

    expect(saga.next().value).toEqual(
      call([Navigation, Navigation.setRoot], action.payload),
    );
    expect(saga.next().done).toBe(true);
  });
});

describe('watchNavigationChannel', () => {
  test('should create channel first', () => {
    const saga = watchNavigationChannel();

    expect(saga.next().value).toEqual(call(createNavigationChannel));
  });

  test('then should watch for any action from channel', () => {
    const saga = watchNavigationChannel();
    const channel = 'CHANNEL';

    saga.next();

    expect(saga.next(channel).value).toEqual(take(channel));
  });

  test('then should dispatch these actions', () => {
    const saga = watchNavigationChannel();
    const channel = 'CHANNEL';
    const action = { type: 'PUSH' };
    const anotherAction = { type: 'POP' };

    saga.next();
    saga.next(channel);

    expect(saga.next(action).value).toEqual(put(action));

    saga.next(channel);

    expect(saga.next(anotherAction).value).toEqual(put(anotherAction));
  });
});

describe('rootSaga', () => {
  test('should spawn other sagas', () => {
    const saga = rootSaga();

    expect(saga.next().value).toEqual(spawn(watchNavigationChannel));
    expect(saga.next().value).toEqual(spawn(watchScreenActions));
    expect(saga.next().done).toBe(true);
  });
});
