import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import $ from 'jquery';
import App from '../client/src/components/App';

configure({ adapter: new Adapter() });

describe('Unit Tests', () => {

  test('should render the app component on the screen', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toExist();
  });
});
