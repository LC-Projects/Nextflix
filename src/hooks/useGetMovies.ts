import { useAppSelector } from "../app/hooks";
import { useEffect, useState } from "react";
import { getMovies } from "../api/moviesRequest";
import { MovieResultsI } from "../types/MovieResultsI";
import APP_CONFIGS from "../variables/configs";

export default function useGetMovies(): { movies: MovieResultsI[] } {
    // Redux
    const auth = useAppSelector((state) => state.auth);

    //   States
    const [movies, setMovies] = useState<MovieResultsI[]>([]);

    useEffect(() => {
        if (!APP_CONFIGS.api_key) return;

        (async () => {
            const res = await getMovies(APP_CONFIGS.api_key);

            console.log(res)

            if (res) {
                setMovies(res.results);
            }
        })()

    }, [])

    return { movies };
}
