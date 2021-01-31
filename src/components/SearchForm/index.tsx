import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState,
} from 'react';
import { IArticle } from '../ResultsCard';
import ResultsList from '../ResultsList';
import { getArticles } from './api';
import {
  EErrorMessage,
  IResponseDataProps
} from './utils';

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
    <main>
      <h1>BT React Code Test - by Lindsay Foley - 28/1/21</h1>
      <hr />
      {errorMessage && <h3>{errorMessage}</h3>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="article-searchbox">Start your search for a news article</label>
        <input
          id="article-searchbox"
          type="text"
          value={searchTerm}
          placeholder="Enter article"
          onChange={handleOnChange}
          required
        />
        <input type="submit" value="Submit search" />
      </form>
      {articleResults && !errorMessage && <ResultsList list={articleResults} />}
    </main>
  );
};

export default SearchForm;
