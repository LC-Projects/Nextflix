import { MoviesI } from "./types/MovieI.js";
import { fetchData, GiveData } from "./utils.js";
import APP_CONFIGS from "./variables.js";


// MOVIES
export async function getMovies(page: number = 1) {
    const url = "https://api.themoviedb.org/3/discover/movie?";
    const params = {
        api_key: APP_CONFIGS.api_key,
        page,
    };

    const res = await fetchData<MoviesI>(url, params);
    if (res) {
        return res
    }
};

// Movies by id
export async function getMovieById(id: number) {
    const url = `https://api.themoviedb.org/3/movie/${id}?`;
    const params = {
        api_key: APP_CONFIGS.api_key,
    };

    const res = await fetchData<MoviesI>(url, params);
    if (res) {
        return res
    }
};
