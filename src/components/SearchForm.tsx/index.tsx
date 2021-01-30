import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState,
} from 'react';
import { IArticle } from '../ResultsCard';
import ResultsList from '../ResultsList';
import {
  EErrorMessage,
  IResponseDataProps,
  MAX_RESULTS,
  NEWS_API_URL,
} from './utils';

const getArticles = async (article: string) => {
  const response = await fetch(
    `${NEWS_API_URL}everything?q=${article}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&pageSize=${MAX_RESULTS}`
  );
  return await response.json();
};

const SearchForm: FunctionComponent = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [articleResults, setArticleResults] = useState<IArticle[] | null>(null);
  const [hasErrored, setHasErrored] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(
    EErrorMessage.Generic
  );

  const validateData = (data: IResponseDataProps) => {
    const { status, totalResults } = data;

    if (status !== 'ok') {
      setErrorMessage(EErrorMessage.Generic);
      setHasErrored(true);
    } else if (totalResults === 0) {
      setErrorMessage(EErrorMessage.NoResults);
      setHasErrored(true);
    } else {
      setArticleResults(data.articles);
      setHasErrored(false);
    }
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    validateSearchTerm(term);
  };

  const validateSearchTerm = (term: string) => {
    const validCharacter = new RegExp('^[a-zA-Z0-9]');
    const isInvalidFirstCharacter =
      searchTerm.length === 0 && !validCharacter.test(term);
    const termIsInvalid = term.replace(/\s/g, '').length === 0;

    if (termIsInvalid || isInvalidFirstCharacter) {
      setErrorMessage(EErrorMessage.Invalid);
      setHasErrored(true);
      setArticleResults(null);
    } else {
      setHasErrored(false);
    }

    setSearchTerm(term);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (hasErrored) {
      return;
    }

    const term = encodeURIComponent(searchTerm.trim());

    try {
      const data = await getArticles(term);
      validateData(data);
    } catch (e) {
      setErrorMessage(EErrorMessage.RejectedPromise);
      setHasErrored(true);
    }
  };

  return (
    <section>
      <h1>BT React Code Test - by Lindsay Foley - 28/1/21</h1>
      {hasErrored && <h3>{errorMessage}</h3>}
      <form onSubmit={handleSubmit}>
        <label>
          What news article can I get you?
          <input
            type="text"
            value={searchTerm}
            placeholder="Search here"
            onChange={handleOnChange}
            required
          />
        </label>
        <input type="submit" value="Search" />
      </form>
      {articleResults && !hasErrored && <ResultsList list={articleResults} />}
    </section>
  );
};

export default SearchForm;
