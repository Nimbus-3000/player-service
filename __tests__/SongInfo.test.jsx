/* eslint-disable no-undef */
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SongInfo from '../client/src/components/SongInfo';

configure({ adapter: new Adapter() });

describe('Unit Tests', () => {
  test('should render the SongInfo component on the screen', () => {
    const wrapper = shallow(<SongInfo />);
    expect(wrapper).toExist();
  });

  test('should change class state on mouse enter', () => {
    const wrapper = shallow(<SongInfo />);
    const tag = wrapper.find('#TP-tag');
    tag.simulate('mouseenter');
    expect(wrapper.state().tagClass).toBe('TP-tagHover');
  });

  test('should change class state on mouse leave', () => {
    const wrapper = shallow(<SongInfo />);
    const tag = wrapper.find('#TP-tag');
    tag.simulate('mouseleave');
    expect(wrapper.state().tagClass).toBe('TP-tagDefault');
  });
});
