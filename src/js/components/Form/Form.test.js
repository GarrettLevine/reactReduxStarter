import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Form from './Form.jsx';

function setup(newProps) {
  const props = {
    ...newProps,
  };

  const wrapper = shallow(<Form {...props} />);

  return {
    wrapper,
    props,
  };
}

describe('Form Component', () => {
  it('renders properly', () => {
    const { wrapper, props } = setup({
      className: 'test',
      handleSubmit: expect.createSpy(),
    });

    expect(wrapper.hasClass('ui form')).toBe(true);

    wrapper.simulate('submit', { preventDefault: expect.createSpy() });
    expect(props.handleSubmit).toHaveBeenCalled();
  });
});
