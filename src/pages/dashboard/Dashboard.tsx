import Listing from "../../components/listing/Listing";
import useGetMovies from "../../hooks/useGetMovies";
import Slider from "../../layouts/mainLayout/Slider";
import { MovieResultsI } from "../../../backend/app/api/types/MovieI";

import useGetFavoriteMovies from "../../hooks/useGetFavoriteMovies";

export default function Dashboard() {
  const { movies }: { movies: MovieResultsI[] } = useGetMovies();
  const { movies: favoriteMoviesData }: { movies: MovieResultsI[] } = useGetFavoriteMovies();

  return (
    <>
      <Slider />
      <Listing movies={favoriteMoviesData} className="horizontal" />
      <Listing movies={movies} className="horizontal" />
    </>
  )
}
