import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Grid from './Grid.jsx';

function setup(newProps) {
  const props = {
    columns: 'two',
    className: 'test',
    ...newProps,
  };

  const wrapper = shallow(<Grid { ...props } />);

  return {
    wrapper,
    props,
  };
};

describe('Grid Component', () => {
  it('renders properly', () => {
    const { wrapper, props } = setup();

    expect(wrapper.hasClass(`ui two column grid test`)).toBe(true);
  });
});