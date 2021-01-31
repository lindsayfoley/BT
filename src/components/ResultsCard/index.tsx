import { FunctionComponent } from 'react';
import DOMPurify from 'dompurify';

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

export const CHARACTER_LIMIT = 150;
export const truncateText = (text: string) =>
  `${text.slice(0, CHARACTER_LIMIT)}...`;

const ResultsCard: FunctionComponent<IArticle> = (article: IArticle) => {
  const {
    title,
    author,
    description,
    publishedAt,
    url,
    source: { name, id },
  } = article;

  const sanitsedDescription = DOMPurify.sanitize(description, {
    USE_PROFILES: { html: true },
  });

  if (sanitsedDescription.length === 0) {
    return null;
  }

  const truncatedDescription = truncateText(sanitsedDescription);

  return (
    <>
      <article key={publishedAt}>
        <h3>{title}</h3>
        <span className="author">{author || name || id}</span>
        <p>
          <span
            className="description"
            dangerouslySetInnerHTML={{ __html: truncatedDescription }}
          />
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
