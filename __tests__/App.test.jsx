/* eslint-disable no-undef */
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../client/src/components/App';
import PlayButton from '../client/src/components/PlayButton';
import AlbumCover from '../client/src/components/AlbumCover';
import MediaImage from '../client/src/components/MediaImage';
import SongInfo from '../client/src/components/SongInfo';

configure({ adapter: new Adapter() });

describe('Unit Tests', () => {
  const wrapper = shallow(<App />);
  test('should render the app component on the screen', () => {
    expect(wrapper).toExist();
  });

  test('should render the PlayButton component on the screen', () => {
    expect(wrapper.find(PlayButton)).toExist();
  });

  test('should render the AlbumCover component on the screen', () => {
    expect(wrapper.find(AlbumCover)).toExist();
  });

  test('should render the MediaImage component on the screen', () => {
    expect(wrapper.find(MediaImage)).toExist();
  });

  test('should render the SongInfo component on the screen', () => {
    expect(wrapper.find(SongInfo)).toExist();
  });
});
