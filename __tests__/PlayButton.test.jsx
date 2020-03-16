/* eslint-disable no-undef */
import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../client/src/components/App';
import PlayButton from '../client/src/components/PlayButton';

configure({ adapter: new Adapter() });

describe('Unit Tests', () => {
  test('should have songName prop passed from App component', () => {
    const wrapper = mount(<App />).find(PlayButton);
    expect(wrapper.props().songName).toBeDefined();
  });
});
