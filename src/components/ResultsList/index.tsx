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
      {list.map((article) => (
        <ResultsCard {...article} />
      ))}
    </section>
  );
};

export default ResultsList;
