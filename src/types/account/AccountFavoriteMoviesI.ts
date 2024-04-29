import { MovieResultsI } from "../MovieResultsI";

export interface AccountFavoriteMoviesI {
  page: number;
  results: MovieResultsI[];
  total_pages: number;
  total_results: number;
}
