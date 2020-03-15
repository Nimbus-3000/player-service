import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import $ from 'jquery';
import App from '../client/src/components/App';

configure({ adapter: new Adapter() });

describe('Unit Tests', () => {
  // jest.mock('axios', () => {
  //   const tasks = [
  //     {
  //       isComplete: false,
  //       _id: '5e14daea497a3a48c5bd4612',
  //       task: 'Write some tests!',
  //       date: '2020-01-07T19:24:26.332Z',
  //       __v: 0,
  //     },
  //   ];

  //   return {
  //     get: jest.fn(() => Promise.resolve(tasks)),
  //   };
  // });

  test('should render the app component on the screen', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toExist();
  });
});
