import { useAppSelector } from "../app/hooks";
import { useEffect, useState } from "react";
import { getMovies } from "../api/moviesRequest";
import { MovieResultsI } from "../../backend/app/api/types/MovieI";
import APP_CONFIGS from "../variables/configs";
import useAccount from "./useAccount";
import { AccountI } from "../types/account/AccountFavoriteMoviesI";

export default function useGetMovies(): { movies: MovieResultsI[] } {
    // Redux
    const { account } = useAccount<AccountI>({
        user_id: useAppSelector((state) => state.auth.id)
    })

    //   States
    const [movies, setMovies] = useState<MovieResultsI[]>([]);

    useEffect(() => {
        if (!APP_CONFIGS.api_key) return;

        (async () => {
            await getMovies(APP_CONFIGS.api_key).then((res) => {
                if (res) {
                    const favoriteMovies = res.results.map((movie) => {
                        const favoris = account.user?.movie_favoris.find((item) => item.id == movie.id) ? true : false;    
                        const to_watch = account.user?.movie_to_watch?.find((item) => item.id == movie.id) ? true : false;
                        return { ...movie, is_favorite: favoris, is_to_watch: to_watch };
                    });
                    setMovies(favoriteMovies);
                }
            });
        })()

    }, [account])
    return { movies };
}
