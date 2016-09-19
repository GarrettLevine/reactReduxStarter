import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Header from './Header.jsx';

function setup(newProps) {
  const props = {
    ...newProps,
  };

  const wrapper = shallow(<Header {...props} />);

  return {
    wrapper,
    props,
  };
}

describe('Header Component', () => {
  it('renders properly', () => {
    const { wrapper, props } = setup();

    expect(wrapper.find('.ui.header').length).toEqual(1);
  });

  it('renders with an icon', () => {
    const { wrapper, props } = setup({
      type: 'icon',
      subHeading: 'double test',
    });

    expect(wrapper.find('.ui.header.icon').length).toEqual(1);
  });

  it('renders as a subheader', () => {
    const { wrapper, props } = setup({
      type: 'sub-header',
      heading: 'test',
    });

    expect(wrapper.find('.ui.header.sub').length).toEqual(1);
    expect(wrapper.find('.ui.header.sub').text()).toEqual(props.heading);
  });
});
