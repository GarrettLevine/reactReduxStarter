import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Checkbox from './Checkbox.jsx';

function setup(newProps) {
  const props = {
    label: 'elegonza',
    value: true,
    className: 'testing',
    handleChange: expect.createSpy(),
    id: 'unique',
    ...newProps,
  };

  const wrapper = shallow(<Checkbox {...props} />);

  return {
    wrapper,
    props,
  };
}

describe('Input Component', () => {
  it('renders properly', () => {
    const { wrapper, props } = setup();
    const input = wrapper.find('input');

    expect(wrapper.hasClass('field testing')).toBe(true);
    expect(input.prop('value')).toEqual(props.value);
    expect(input.prop('id')).toEqual(props.id);
    expect(input.prop('type')).toEqual('checkbox');

    input.simulate('change', false);
    expect(props.handleChange).toHaveBeenCalledWith(false);
  });
});