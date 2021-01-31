import { NEWS_API_URL, MAX_RESULTS } from "./utils";

export const getArticles = async (article: string) => {
    const response = await fetch(
      `${NEWS_API_URL}everything?q=${article}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&pageSize=${MAX_RESULTS}`
    );
    return await response.json();
  };
  