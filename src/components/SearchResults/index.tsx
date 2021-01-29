import React, { FunctionComponent } from 'react';

export interface IArticle {
    title: string;
    author: string;
    description: string;
}

export type TArticleList = IArticle[];

const SearchResults: FunctionComponent<TArticleList> = (props: TArticleList) => {

    if (!props || props.length === 0) {
        return null;
    }

    const articles = props.map(article => 
      <article key={article.title}>
        <h2>{article.title}</h2>
        <span>{article.author}</span>
        <p>{article.description}</p>
      </article>
    );

    return (
      <>
        {articles}
      </>
    );
};

export default SearchResults;