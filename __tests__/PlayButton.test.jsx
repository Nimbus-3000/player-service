/* eslint-disable no-undef */
import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlayButton from '../client/src/components/PlayButton';

configure({ adapter: new Adapter() });

// const testData = { songTitle: 'qui atque sit', artistName: 'Rafaela', mediaFile: 'https://audiblymedia.s3-us-west-1.amazonaws.com/audio/1.mp3' };

describe('Unit Tests', () => {
  test('should render the PlayButton component on the screen', () => {
    const wrapper = shallow(<PlayButton />);
    expect(wrapper).toExist();
  });

  test('should play when playButton is clicked and song is paused', () => {
    const wrapper = (<PlayButton />);
    const playButton = wrapper.instance().find('#TP-playButton');
    playButton.simulate('click');
    expect(wrapper.state().paused).toBe(false);
  });

  test('should pause song when playButton is clicked and song is playing', () => {
    const wrapper = shallow(<PlayButton />);
    const playButton = wrapper.find('#TP-playButton');
    playButton.simulate('click');
    expect(wrapper.state().paused).toBe(true);
  });

  test('should change class state on mouse enter', () => {
    const wrapper = shallow(<PlayButton />);
    const name = wrapper.find('.TP-nameContainer');
    name.simulate('mouseenter');
    expect(wrapper.state().artistClass).toBe('TP-artistNameHover');
  });

  test('should change class state on mouse leave', () => {
    const wrapper = shallow(<PlayButton />);
    const name = wrapper.find('.TP-nameContainer');
    name.simulate('mouseleave');
    expect(wrapper.state().artistClass).toBe('TP-artistNameDefault');
  });
});
