/* eslint-disable no-undef */
import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import App from '../client/src/components/App';
import PlayButton from '../client/src/components/PlayButton';

configure({ adapter: new Adapter() });

const testData = { songTitle: 'qui atque sit', artistName: 'Rafaela', mediaFile: 'https://audiblymedia.s3-us-west-1.amazonaws.com/audio/1.mp3' };

describe('Unit Tests', () => {
  const mockPlaySong = jest.fn();
  const wrapper = shallow(<PlayButton
    songTitle={testData.songTitle}
    artistName={testData.artistName}
    mediaFile={testData.mediaFile}
    playSong={mockPlaySong}
  />);
  test('should render the PlayButton component on the screen', () => {
    expect(wrapper).toExist();
  });

  test('should invoke playSong when playButton is clicked', () => {
    const playButton = wrapper.find('#TP-playButton');
    playButton.simulate('click');
    expect(mockPlaySong).toHaveBeenCalledWith(testData.mediaFile);
  });
});
