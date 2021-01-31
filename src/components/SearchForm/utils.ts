import { IArticle } from '../ResultsCard';
export interface IResponseDataProps {
  status: string;
  totalResults: number;
  articles: IArticle[];
}

export enum EErrorMessage {
  Generic = 'Sorry an error has occurred',
  NoResults = 'Sorry no results were found',
  Invalid = 'Please enter a valid search term',
  Illegal = 'The following characters are not allowed: <, >, ), (',
  RejectedPromise = 'Sorry, something went wrong, please try again later',
}