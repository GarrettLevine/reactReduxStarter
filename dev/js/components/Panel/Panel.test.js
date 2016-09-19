import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Panel from './Panel.jsx';

function setup(newProps) {
  const props = {
    visible: true,
    menu: true,
    direction: 'left',
    className: 'test',
    ...newProps,
  };

  const wrapper = shallow(<Panel {...props} />);

  return {
    wrapper,
    props,
  };
}

describe('Panel Component', () => {
  it('should render', () => {
    const { wrapper, props } = setup();

    expect(
      wrapper.hasClass('ui sidebar left test visible menu')
    ).toBe(true);
  });
});
