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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateData = (data: IResponseDataProps) => {
    const { status, totalResults } = data;

    if (status !== 'ok') {
      setErrorMessage(EErrorMessage.Generic);
    } else if (totalResults === 0) {
      setErrorMessage(EErrorMessage.NoResults);
      setArticleResults(null);
    } else {
      setArticleResults(data.articles);
    }
  };

  const validateSearchTerm = (term: string) => {
    const validCharacters = new RegExp('[a-zA-Z0-9]');
    const illegalCharacters = new RegExp('[<|>|(|)]');
    const termIsInvalid = term.replace(/\s/g, '').length === 0;

    const hasIllegalCharacters = illegalCharacters.test(term);
    const hasOnlyInvalidCharacters = !validCharacters.test(term);
    const isInvalidFirstCharacter =
      term.length === 1 && !validCharacters.test(term);

    if (hasIllegalCharacters) {
      setErrorMessage(EErrorMessage.Illegal);
      setArticleResults(null);
      return;
    }

    if (termIsInvalid || isInvalidFirstCharacter || hasOnlyInvalidCharacters) {
      setErrorMessage(EErrorMessage.Invalid);
      setArticleResults(null);
    } else {
      setErrorMessage(null);
    }
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    validateSearchTerm(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (errorMessage) {
      return;
    }

    const term = encodeURIComponent(searchTerm.trim());

    try {
      const data = await getArticles(term);
      validateData(data);
    } catch (e) {
      setErrorMessage(EErrorMessage.RejectedPromise);
    }
  };

  return (
    <section>
      <h1>BT React Code Test - by Lindsay Foley - 28/1/21</h1>
      {errorMessage && <h3>{errorMessage}</h3>}
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
      {articleResults && !errorMessage && <ResultsList list={articleResults} />}
    </section>
  );
};

export default SearchForm;
