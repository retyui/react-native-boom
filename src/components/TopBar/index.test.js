import React from 'react';
import { shallow } from 'enzyme';

import Component from './index';

const defaultProps = {
  componentId: '',
  text: '',
};

const render = props => shallow(<Component {...defaultProps} {...props} />);

const Nav = {};

const module = 'react-native-navigation';

beforeEach(() => {
  Nav.mergeOptions = jest.fn();
});

beforeAll(() => {
  jest.mock(module, () => ({
    Navigation: Nav,
  }));
});

afterAll(() => jest.unmock(module));

test('must call mergeOptions', () => {
  const componentId = 'componentId';
  const text = 'text';
  const buttons = { buttons: 'buttons' };

  render({
    componentId,
    text,
    buttons,
  });

  expect(Nav.mergeOptions).toHaveBeenCalledTimes(1);
  expect(Nav.mergeOptions).toHaveBeenCalledWith(componentId, {
    topBar: {
      visible: true,
      title: {
        text,
      },
      ...buttons,
    },
  });
});

test('must render nothing', () => {
  const wrap = render();

  expect(wrap.get(0)).toBe(null);
});

test('mush call componentDidUpdate', () => {
  const wrap = render();

  expect(Nav.mergeOptions).toHaveBeenCalledTimes(1);

  wrap.setProps({});

  expect(Nav.mergeOptions).toHaveBeenCalledTimes(2);
});
