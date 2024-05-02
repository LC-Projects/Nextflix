import { useAppSelector } from "../app/hooks";
import { useEffect, useState } from "react";
import { getMovies } from "../api/moviesRequest";
import { MovieResultsI } from "../types/MovieResultsI";
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
                        const favoris = account.user?.movie_favoris?.map((item) => {
                            if (item.id === movie.id) {
                                return true;
                            }
                            return false;
                        }) ?? [];

                        const to_watch = account.user?.movie_to_watch?.map((item) => {
                            if (item.id === movie.id) {
                                return true;
                            }
                            return false;
                        }) ?? [];
                        return {...movie, is_favorite: favoris.includes(true), to_watch: to_watch.includes(true)};
                    });
                    setMovies(favoriteMovies);

                    console.log(res);
                }
            });
        })()

    }, [])

    return { movies };
}
