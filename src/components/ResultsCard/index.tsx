import { FunctionComponent } from 'react';
interface ISource {
  id: string;
  name: string;
}
export interface IArticle {
  title: string;
  author: string;
  description: string;
  publishedAt: string;
  url: string;
  source: ISource;
}

const CHARACTER_LIMIT = 150;

const truncateText = (text: string) => `${text.slice(0, CHARACTER_LIMIT)}...`;

const ResultsCard: FunctionComponent<IArticle> = (article: IArticle) => {
  const {
    title,
    author,
    description,
    publishedAt,
    url,
    source: { name, id },
  } = article;

  const truncatedDescription = truncateText(description);

  return (
    <>
      <article key={publishedAt}>
        <h3>{title}</h3>
        <span>{author || name || id}</span>
        <p>
          <span dangerouslySetInnerHTML={{ __html: truncatedDescription }} />
          <a target="_blank" rel="noreferrer" href={url}>
            read more &gt;
          </a>
        </p>
      </article>
      <hr />
    </>
  );
};

export default ResultsCard;
