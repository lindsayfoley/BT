const NEWS_API_URL = 'https://newsapi.org/v2/';
const MAX_RESULTS = 10;

export const getArticles = async (article: string) => {
  const response = await fetch(
    `${NEWS_API_URL}everything?q=${article}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&pageSize=${MAX_RESULTS}`
  );
  return await response.json();
};
