import { useAppSelector } from "../app/hooks";
import { useEffect, useState } from "react";
import { getMovies } from "../api/moviesRequest";
import { MovieResultsI } from "../types/MovieResultsI";

export default function useGetMovies(): { movies: MovieResultsI[] } {
    // Redux
    const auth = useAppSelector((state) => state.auth);

    //   States
    const [movies, setMovies] = useState<MovieResultsI[]>([]);

    useEffect(() => {
        if (!auth.api_key) return;

        (async () => {
            const res = await getMovies(auth.api_key as string);

            console.log(res)

            if (res) {
                setMovies(res.results);
            }
        })()

    }, [])

    return { movies };
}
