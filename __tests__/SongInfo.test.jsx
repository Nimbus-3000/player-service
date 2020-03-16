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
});
