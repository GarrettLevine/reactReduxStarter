import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import Row from './Row.jsx';

function setup(newProps) {
  const props = {
    className: 'test',
    column: 'two',
    ...newProps,
  };

  const wrapper = shallow(<Row { ...props } />);

  return {
    wrapper,
    props,
  };
}

describe('Row Component', () => {
  it('renders properly', () => {
    const { wrapper, props } = setup();

    expect(wrapper.hasClass(`${props.column} column row test`)).toBe(true);
  });
});
