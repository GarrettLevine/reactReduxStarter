import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Column from './Column.jsx';

function setup(newProps) {
  const props = {
    columns: 'two',
    className: 'test',
    ...newProps,
  };

  const wrapper = shallow(<Column { ...props } />);

  return {
    wrapper,
    props,
  };
};

describe('Column Component', () => {
  it('renders properly', () => {
    const { wrapper, props } = setup();

    expect(wrapper.hasClass(`${props.columns} wide column test`)).toBe(true);
  });
});
