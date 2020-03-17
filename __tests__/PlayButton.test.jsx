/* eslint-disable no-undef */
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import App from '../client/src/components/App';
import PlayButton from '../client/src/components/PlayButton';

configure({ adapter: new Adapter() });

const testSongData = { songTitle: 'qui atque sit', artistName: 'Rafaela' };

describe('Unit Tests', () => {
  test('should render the PlayButton component on the screen', () => {
    const wrapper = shallow(<PlayButton />);
    expect(wrapper).toExist();
  });

  test('should include 3 items', () => {
    const wrapper = shallow(<PlayButton songTitle={testSongData.songTitle} />);
    // console.log('TEST', wrapper);
    expect(wrapper.props().children).toHaveLength(3);
  });
});
