import React from 'react';
import { shallow, render} from 'enzyme';
import ResultsCard, { IArticle, CHARACTER_LIMIT, truncateText } from '../../../src/components/ResultsCard';
import { mockArticleList } from '../ResultsList/ResultsList.test';

const mockArticle = mockArticleList[0];

const setup = (useRender: boolean = false) => {
  if (useRender) {
    return render(<ResultsCard {...mockArticle} />);
  }

  return shallow(<ResultsCard {...mockArticle} />);
};

describe('<ResultsCard />', () => {
  let wrapper;
  
  it('renders without crashing', () => {
    wrapper = setup();
    expect(wrapper.isEmptyRender()).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });

  it(`should truncate the description to ${CHARACTER_LIMIT} words and add an ellipsis`, () => {
    wrapper = setup(true);
    expect(wrapper.find('.description').text()).toContain(truncateText(mockArticle.description));
    expect(wrapper.find('.description').text()).toContain('...');
  });

  it('should render an article with all required details', () => {
    wrapper = setup();
    expect(wrapper.find('article')).toHaveLength(1);
    expect(wrapper.find('h3').text()).toContain(mockArticle.title);
    expect(wrapper.find('.author').text()).toContain(mockArticle.author);
    expect(wrapper.find('.description')).toHaveLength(1);
    expect(wrapper.find('a').last().prop('href')).toContain(mockArticle.url);
    expect(wrapper.find('hr')).toHaveLength(1);
  });
});
