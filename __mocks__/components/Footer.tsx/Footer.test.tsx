import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Footer from '../../../src/components/Footer.tsx';

const setup = () => shallow(<Footer />);

describe('<Footer />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = setup();
  });
  
  it('renders without crashing', () => {
    expect(wrapper.isEmptyRender()).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders text in footer', () => {
    expect(wrapper.find('small').text()).toBeTruthy();
  });
});
