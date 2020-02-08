import { MENU_SCENE } from '@/features/menu/consts/scenes';

import { componentDidAppear } from '../actions';
import reducer from '../reducer';

test('should set componentId on COMPONENT_DID_APPEAR', () => {
  const action = componentDidAppear({ componentId: '123' });
  const state = reducer({ componentId: null }, action);

  expect(state.componentId).toEqual('123');
});

test('should set componentName on COMPONENT_DID_APPEAR', () => {
  const action = componentDidAppear({ componentName: 'name' });
  const state = reducer({ componentName: null }, action);

  expect(state.componentName).toEqual('name');
});

test('should not do anything if menu appeared', () => {
  const action = componentDidAppear({ componentName: MENU_SCENE });
  const state = reducer({ componentName: 'name', componentId: '123' }, action);

  expect(state.componentId).toEqual('123');
  expect(state.componentName).toEqual('name');
});
