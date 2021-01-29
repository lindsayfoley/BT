import React, { ChangeEvent, FormEvent, FunctionComponent, useState } from 'react';
import { IArticle } from '../ResultsCard';
import ResultsList from '../ResultsList';

const NEWS_API_URL = 'https://newsapi.org/v2/';
const API_KEY = '11e41bf5c1b548a29424441eeeaf3906';
const MAX_RESULTS = 10;

const getArticles = async (article: string) => {
  const response = await fetch(
    `${NEWS_API_URL}everything?q=${article}&apiKey=${API_KEY}&pageSize=${MAX_RESULTS}`
  );
  return await response.json();
};

const SearchForm: FunctionComponent = () => {
  const [searchTerm, setSearchTerm] = useState<string>('Search here');
  const [articleResults, setArticleResults] = useState<IArticle[] | null>(null);
  const [hasErrored, setHasErrored] = useState<boolean>(false);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const data = await getArticles(searchTerm);
      setArticleResults(data.articles);
    } catch (e) {
      setHasErrored(true);
    }
  };

  return (
    <section>
      <h1>BT React Code Test - by Lindsay Foley - 28/1/21</h1>
      {hasErrored && (
        <h3>Sorry! We can't find that article, try searching again...</h3>
      )}
      <form onSubmit={handleSubmit}>
        <label>What news article can I get you?</label>
        <input type="text" value={searchTerm} onChange={handleOnChange} />
        <input type="submit" value="Search" />
      </form>
      {articleResults && <ResultsList list={articleResults} />}
    </section>
  );
};

export default SearchForm;
