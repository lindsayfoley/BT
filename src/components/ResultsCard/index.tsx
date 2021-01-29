import { FunctionComponent } from 'react';

export interface IArticle {
  title: string;
  author: string;
  description: string;
}

const ResultsCard: FunctionComponent<IArticle> = (article: IArticle) => (
  <article key={article.title}>
    <h2>{article.title}</h2>
    <span>{article.author}</span>
    <p>{article.description}</p>
  </article>
);

export default ResultsCard;
