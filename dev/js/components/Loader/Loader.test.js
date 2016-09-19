import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Loader from './Loader.jsx';

function setup(newProps) {
  const props = {
    ...newProps,
  };

  const wrapper = shallow(<Loader {...props} />);

  return {
    wrapper,
    props,
  };
}

describe('Loader Component', () => {
  it('renders properly', () => {
    const { wrapper, props } = setup({
      isLoading: true,
      className: 'test',
    });

    expect(wrapper.hasClass('ui segment test')).toBe(true);
    expect(wrapper.find('.active').length).toEqual(1);
  });

  it('renders disabled and inverted with a size', () => {
    const { wrapper, props } = setup({
      isLoading: false,
      inverted: true,
      size: 'small',
    });

    expect(wrapper.find('.disabled').length).toEqual(1);
    expect(wrapper.find('.inverted').length).toEqual(1);
    expect(wrapper.find('.small').length).toEqual(1);
  });
});