import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Input from './Input.jsx';

function setup(newProps) {
  const props = {
    label: 'elegonza',
    value: 'realness',
    placeholder: 'hunti',
    className: 'testing',
    handleChange: expect.createSpy(),
    id: 'unique',
    type: 'text',
    ...newProps,
  };

  const wrapper = shallow(<Input {...props} />);

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
    expect(input.prop('placeholder')).toEqual(props.placeholder);
    expect(input.prop('id')).toEqual(props.id);
    expect(input.prop('type')).toEqual(props.type);

    input.simulate('change', '123');
    expect(props.handleChange).toHaveBeenCalledWith('123');
  });
});