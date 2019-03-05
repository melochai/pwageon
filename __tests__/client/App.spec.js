import React from 'react';
import { shallow } from 'enzyme';
import App from '../../client/App';

describe('CharonsList', () => {
  it('should render a <div />', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('div')).toHaveLength(1);
  });
});
