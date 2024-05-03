import { MoviesI } from "../../backend/app/api/types/MovieI";

import APP_CONFIGS from "../variables/configs";
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

// movie details
export async function getMovie(movie_id: string | number) {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}`;
    const params = {
        api_key: APP_CONFIGS.api_key,
    };

    const res = await fetchData(url, params);
    if (res) {
        return res
    }
};




export interface MovieTrailersI {
    id: number
    results: MovieTrailerI[]
}

export interface MovieTrailerI {
    iso_639_1: string
    iso_3166_1: string
    name: string
    key: string
    site: string
    size: number
    type: string
    official: boolean
    published_at: string
    id: string
}
// get movie trailer
export async function getMovieTrailers(movie_id: string | number) {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}/videos`;

    const res: MovieTrailersI = await fetchData(url);
    if (res) {
        const trailers = res.results.map((trailer) => {
            if (trailer.site !== "YouTube") {
                return null
            }
            return {
                ...trailer,
                url: `https://www.youtube.com/watch?v=${trailer.key}`
            }
        })

        return trailers
    }
};


export interface MovieCCI {
    id: number
    cast: CastI[]
    crew: CrewI[]
}

export interface CastI {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    cast_id: number
    character: string
    credit_id: string
    order: number
}

export interface CrewI {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    credit_id: string
    department: string
    job: string
}


// get movie actors
export async function getMovieCasts(movie_id: string | number): Promise<MovieCCI> {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}/credits`;

    const res: MovieCCI = await fetchData(url);
    if (res) {
        return res
    } else {
        return { id: 0, cast: [], crew: [] }
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

// add to favorite
export async function addToWatchMovie(user_id: string, movie_id: number) {
    const url = `http://localhost:3333/api/movies/to_watch`;
    const bodyJSON = {
        user_id,
        movie_id
    };

    const res = await GiveData(url, "POST", bodyJSON);
    if (res) {
        return res
    }
};