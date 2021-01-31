import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Header from '../../../src/components/Header';

const setup = () => shallow(<Header />);

describe('<Header />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = setup();
  });
  
  it('renders without crashing', () => {
    expect(wrapper.isEmptyRender()).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a logo', () => {
    expect(wrapper.find('img')).toHaveLength(1);
  });
});
