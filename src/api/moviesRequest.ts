import { MoviesI } from "../types/MoviesI";
import { GiveData, fetchData } from "./utilis";

// MOVIES
export async function getMovies(api_key: string, page: number = 1) {
    const url = "https://api.themoviedb.org/3/discover/movie?";
    const params = {
        api_key,
        page,
    };

    const res = await fetchData<MoviesI>(url, params);
    if (res) {
        return res
    }
};

// add to favorite
export async function addFavoriteMovie(user_id: string, movie_id: number) {
    const url = `http://localhost:3333/api/movies/favorises`;
    const bodyJSON = {
        user_id,
        movie_id
    };

    const res = await GiveData(url, "POST", bodyJSON);
    if (res) {
        return res
    }
};