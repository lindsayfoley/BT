import { IArticle } from "../ResultsCard";

export const NEWS_API_URL = 'https://newsapi.org/v2/';
export const API_KEY = '67f5a4ae3d664b1ebd598a22a24cceed';
export const MAX_RESULTS = 10;

export interface IResponseDataProps {
    status: string;
    totalResults: number;
    articles: IArticle[];
  }
  
  export enum EErrorMessage {
    Generic = 'Sorry an error has occurred',
    NoResults = 'Sorry no results were found',
    Invalid = 'Please enter a valid search term',
    RejectedPromise = 'Sorry, something went wrong, please try again later',
  }
  