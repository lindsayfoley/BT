import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Footer from '../../../src/components/Footer';

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

  it('should render small print in footer', () => {
    expect(wrapper.find('small')).toHaveLength(1);
  });
});
