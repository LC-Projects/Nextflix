import { MovieResultsI } from "./MovieResultsI";

export interface MoviesI {
  page: number;
  results: MovieResultsI[];
  total_pages: number;
  total_results: number;
}
