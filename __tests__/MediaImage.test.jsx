/* eslint-disable no-undef */
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MediaImage from '../client/src/components/MediaImage';

configure({ adapter: new Adapter() });

describe('Unit Tests', () => {
  test('should render the MediaImage component on the screen', () => {
    const wrapper = shallow(<MediaImage />);
    expect(wrapper).toExist();
  });
});
