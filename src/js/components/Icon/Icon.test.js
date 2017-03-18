import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Icon from './Icon.jsx';

function setup(newProps) {
  const props = {
    type: 'help',
    className: 'circle',
    ...newProps,
  };

  const wrapper = shallow(<Icon {...props} />);

  return {
    wrapper,
    props,
  };
}

describe('Icon component', () => {
  it('renders properly', () => {
    const { wrapper, props } = setup();

    expect(wrapper.hasClass(`${props.type} icon ${props.className}`)).toBe(true);
  });
});