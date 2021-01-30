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
      <h2>{`Showing ${list.length} results:`}</h2>
      {list.map((article, index) => (
        <ResultsCard {...article} key={`${article.title}-${index}`} />
      ))}
    </section>
  );
};

export default ResultsList;
