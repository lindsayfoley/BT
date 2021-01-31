import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import ResultsList from '../../../src/components/ResultsList';
import ResultsCard, { IArticle } from '../../../src/components/ResultsCard';

export const mockArticleList: IArticle[] = [
  {
    title: 'An earnest review of a robotic cat pillow',
    author: 'Brian Heater',
    description:
      'You don’t need Qoobo in your life. Nobody needs Qoobo, exactly. In fact, first reactions tend to range from befuddlement to bemusement. The robotic cat pillow doesn’t make a ton of sense on the face of it — in part because Qoobo has no face.',
    publishedAt: '2021-02-17T09:30:00-07:00',
    url:
      'https://techcrunch.com/2020/12/30/an-earnest-review-of-a-robotic-cat-pillow/',
    source: {
      id: '123456',
      name: 'Techcrunch',
    },
  },
  {
    title: 'Australia: Man held after armed raid in search of cat',
    author: 'BBC News',
    description: 'Tony Wittman allegedly stormed the shelter on Monday in full camouflage gear and pointed an assault rifle at a female worker.',
    publishedAt: '2021-01-17T09:30:00-05:00',
    url: 'https://www.bbc.co.uk/news/world-australia-55667023',
    source: {
      id: '789101',
      name: 'BBC News',
    },
  },
];

const setup = () => shallow(<ResultsList list={mockArticleList} />);

describe('<ResultsList />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('renders without crashing', () => {
    expect(wrapper.isEmptyRender()).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a header displaying the correct number of search results', () => {
    expect(wrapper.find('h2').text()).toContain(mockArticleList.length);
  });

  it('should render a list of ResultsCard', () => {
    expect(wrapper.find(ResultsCard)).toHaveLength(mockArticleList.length);
  });
});
