/* eslint-disable no-undef */
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AlbumCover from '../client/src/components/AlbumCover';

configure({ adapter: new Adapter() });

describe('Unit Tests', () => {
  test('should render the app component on the screen', () => {
    const wrapper = shallow(<AlbumCover />);
    expect(wrapper).toExist();
  });
});
