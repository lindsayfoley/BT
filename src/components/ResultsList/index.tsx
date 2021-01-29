import { FunctionComponent } from 'react';
import ResultsCard, { IArticle } from '../ResultsCard';

export interface IResultsListProps {
  list: IArticle[];
}

const ResultsList: FunctionComponent<IResultsListProps> = ({ list }) => {
  if (!list || list.length === 0) {
    return null;
  }

  return (
    <section>
      {list.map((article, index) => (
        <ResultsCard {...article} key={`${article.title}-${index}`} />
      ))}
    </section>
  );
};

export default ResultsList;
