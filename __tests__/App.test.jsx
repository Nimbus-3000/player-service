/* eslint-disable no-undef */
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../client/src/components/App';
// import PlayButton from '../client/src/components/PlayButton';
// import AlbumCover from '../client/src/components/AlbumCover';
// import MediaImage from '../client/src/components/MediaImage';
// import SongInfo from '../client/src/components/SongInfo';

configure({ adapter: new Adapter() });

describe('Unit Tests', () => {
  test('should render the app component on the screen', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toExist();
  });

  test('should get songData from database', () => {
    const wrapper = mount(<App />);
    wrapper.instance().getSongData();
    expect(wrapper.state().song).toHaveLength(1);
  });

  // test('should render the AlbumCover component on the screen', () => {
  //   expect(wrapper.find(AlbumCover)).toExist();
  // });

  // test('should render the MediaImage component on the screen', () => {
  //   expect(wrapper.find(MediaImage)).toExist();
  // });

  // test('should render the SongInfo component on the screen', () => {
  //   expect(wrapper.find(SongInfo)).toExist();
  // });
});
