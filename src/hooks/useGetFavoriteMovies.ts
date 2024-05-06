import { useAppSelector } from "../app/hooks";
import { useEffect, useState } from "react";
import { MovieResultsI } from "../../backend/app/api/types/MovieI";
import useAccount from "./useAccount";
import { AccountI } from "../types/account/AccountFavoriteMoviesI";

export default function useGetFavoriteMovies(): { movies: MovieResultsI[] } {
    // Redux
    const { account } = useAccount<AccountI>({
        user_id: useAppSelector((state) => state.auth.id)
    })

    //   States
    const [movies, setMovies] = useState<MovieResultsI[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
          const to_watch_movies = await Promise.all(
            account.user?.movie_favoris.map(async (movie) => {
            if (account.user?.movie_to_watch.some(toWatchMovie => toWatchMovie.id === movie.id)) {
                movie.is_favorite = true;
                movie.is_to_watch = true;
                return movie as MovieResultsI;
              }else{
                movie.is_favorite = true;
                movie.is_to_watch = false;
                return movie as MovieResultsI;
              }
            }) || []
          );
      
          // Filter out any undefined values
          const filteredMovies = to_watch_movies.filter((movie): movie is MovieResultsI => movie !== undefined);
      
          setMovies(filteredMovies);
        };
      
        fetchMovies();
      }, [account]);
    return { movies };
}
