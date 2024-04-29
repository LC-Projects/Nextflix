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
export async function addFavoriteMovie(account_id: string, media_id: number, add: boolean) {
    const url = `https://api.themoviedb.org/3/account/${account_id}/favorite`;
    const bodyJSON = {
        media_type: "movie",
        media_id,
        favorite: add
    };

    const res = await GiveData(url, "POST", bodyJSON);
    if (res) {
        return res
    }
};