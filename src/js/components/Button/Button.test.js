import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Button from './Button';
import Icon from '../Icon';

function setup(newProps) {
  const props = {
    className: 'test',
    handleClick: expect.createSpy(),
    ...newProps,
  };

  const wrapper = shallow(<Button {...props} />);

  return {
    wrapper,
    props,
  };
}

describe('Button component', () => {
  it('should render default', () => {
    const { wrapper, props } = setup();

    expect(wrapper.find('button').hasClass('ui button test')).toBe(true);
    wrapper.find('button').simulate('click');
    expect(props.handleClick).toHaveBeenCalled();
  });

  it('should render an icon button', () => {
    const { wrapper, props } = setup({
      type: 'icon',
    });

    expect(wrapper.find('button').hasClass('ui button test icon')).toBe(true);
  });

  it('should render a left labled button', () => {
    const { wrapper, props } = setup({
      type: 'left-labeled',
      text: 'this is text',
      icon: (<Icon type="plus" />),
    });

    expect(wrapper.find('.ui.button.test.left.labeled').length).toEqual(1);
    expect(wrapper.find('a').text()).toEqual(props.text);
  });

  it('should render right labled button', () => {
    const { wrapper, props } = setup({
      type: 'right-labeled',
    });

    expect(wrapper.find('.ui.button.test.right.labeled').length).toEqual(1);
  });

  it('should render left labled icon', () => {
    const { wrapper, props } = setup({
      type: 'left-labeled-icon',
    });

    expect(wrapper.find('.ui.button.test.labeled.icon').length).toEqual(1);
  });

  it('should render right labled icon', () => {
    const { wrapper, props } = setup({
      type: 'right-labeled-icon',
    });

    expect(wrapper.find('.ui.button.test.right.labeled.icon').length).toEqual(1);
  });
});
