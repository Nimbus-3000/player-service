/* eslint-disable no-undef */
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AlbumCover from '../client/src/components/AlbumCover';

configure({ adapter: new Adapter() });

describe('Unit Tests', () => {
  test('should render the app component on the screen', () => {
    const wrapper = shallow(<AlbumCover />);
    expect(wrapper).toHaveLength(1);
  });

  test('should open modal when art is clicked', () => {
    const wrapper = shallow(<AlbumCover />);
    const art = wrapper.find('#art');
    art.simulate('click');
    expect(wrapper.state().showModal).toBe(true);
  });

  test('should close modal on click', () => {
    const wrapper = shallow(<AlbumCover />);
    const modal = wrapper.find('.TP-modalContent');
    modal.simulate('click');
    expect(wrapper.state().showModal).toBe(false);
  });
});
