import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import SearchForm from '../../../src/components/SearchForm';
import { getArticles } from '../../../src/components/SearchForm/api';
import { mockArticleList } from '../ResultsList/ResultsList.test';
import ResultsList from '../../../src/components/ResultsList';
import { act } from 'react-dom/test-utils';
import { EErrorMessage } from '../../../src/components/SearchForm/utils';

jest.mock('../../../src/components/SearchForm/api');
const mockGetArticles = getArticles as jest.MockedFunction<typeof getArticles>;
const searchTerm = 'Pizza';
const mockEvent = {
  target: { value: searchTerm },
};
const flushPromises = () => new Promise(setImmediate);

const setup = () => shallow(<SearchForm />);

describe('<SearchForm />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('renders without crashing', () => {
    expect(wrapper.isEmptyRender()).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a form with all required fields', () => {
    expect(wrapper.find('label')).toHaveLength(1);
    expect(wrapper.find('#article-searchbox')).toHaveLength(1);
    expect(wrapper.find('input[type="submit"]')).toHaveLength(1);
  });

  it('should update the text in the input field to match the term entered', () => {
    expect(wrapper.find('#article-searchbox').prop('value')).toContain('');
    wrapper.find('#article-searchbox').simulate('change', mockEvent);
    expect(wrapper.find('#article-searchbox').prop('value')).toBe(searchTerm);
  });

  describe('when the search term is valid', () => {
    it('it should call the function to get data with the search term entered', () => {
      wrapper.find('#article-searchbox').simulate('change', mockEvent);
      wrapper.find('form').simulate('submit', { preventDefault: () => {} });
      expect(mockGetArticles).toHaveBeenCalledWith(searchTerm);
    });

    it('should render search results when the promise to fetch is resolved', async () => {
      expect(wrapper.find(ResultsList).exists()).toBeFalsy();
      act(() => {
        wrapper.find('#article-searchbox').simulate('change', mockEvent);
        mockGetArticles.mockResolvedValue({
          articles: mockArticleList,
          status: 'ok',
        });
        wrapper.find('form').simulate('submit', { preventDefault: () => {} });
      });
      await flushPromises();
      wrapper.update();
      expect(wrapper.find(ResultsList).exists()).toBeTruthy();
    });
  });

  describe('when the search is unsuccessful', () => {
    it('should display an error message if the promise rejects', async () => {
      act(() => {
        wrapper.find('#article-searchbox').simulate('change', mockEvent);
        mockGetArticles.mockRejectedValue(new Error('Async error'));
        wrapper.find('form').simulate('submit', { preventDefault: () => {} });
      });
      await flushPromises();
      wrapper.update();
      expect(wrapper.find('h3').text()).toContain(
        EErrorMessage.RejectedPromise
      );
      expect(wrapper.find(ResultsList).exists()).toBeFalsy();
    });

    it('should display an error message if no results are returned for the search term', async () => {
      act(() => {
        wrapper.find('#article-searchbox').simulate('change', mockEvent);
        mockGetArticles.mockResolvedValue({
          articles: [],
          status: 'ok',
          totalResults: 0,
        });
        wrapper.find('form').simulate('submit', { preventDefault: () => {} });
      });
      await flushPromises();
      wrapper.update();
      expect(wrapper.find('h3').text()).toContain(EErrorMessage.NoResults);
    });

    it('should display an generic error message if the the returned status is not "ok"', async () => {
      act(() => {
        wrapper.find('#article-searchbox').simulate('change', mockEvent);
        mockGetArticles.mockResolvedValue({
          articles: [],
          status: 'bad',
          totalResults: 0,
        });
        wrapper.find('form').simulate('submit', { preventDefault: () => {} });
      });
      await flushPromises();
      wrapper.update();
      expect(wrapper.find('h3').text()).toContain(EErrorMessage.Generic);
    });

    it('should display an error message if the term typed into the search box solely contains special characters', () => {
      wrapper.find('#article-searchbox').simulate('change', {
        target: { value: '%$£@!' },
      });
      wrapper.find('form').simulate('submit', { preventDefault: () => {} });
      expect(wrapper.find('h3').text()).toContain(EErrorMessage.Invalid);
    });

    it('should display an error message if the term typed into the search box is a single special character', () => {
      wrapper.find('#article-searchbox').simulate('change', {
        target: { value: '*' },
      });
      wrapper.find('form').simulate('submit', { preventDefault: () => {} });
      expect(wrapper.find('h3').text()).toContain(EErrorMessage.Invalid);
    });

    it('should display an error message if the term typed into the search box contains illegal characters', () => {
      wrapper.find('#article-searchbox').simulate('change', {
        target: { value: '(' },
      });
      wrapper.find('form').simulate('submit', { preventDefault: () => {} });
      expect(wrapper.find('h3').text()).toContain(EErrorMessage.Illegal);
    });
  });
});
