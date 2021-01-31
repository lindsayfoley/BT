import { shallow, ShallowWrapper } from 'enzyme';
import Footer from './index';

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

  it('renders the Titles children', () => {
    expect(wrapper.find('footer').exists()).toBeTruthy();
    expect(wrapper.find('small').text()).toBeTruthy();
  });
});
