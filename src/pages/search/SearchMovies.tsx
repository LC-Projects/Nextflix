import { FormEvent, useEffect, useState } from "react";
import { fetchData } from "../../api/utilis";
import { MovieResultsI, MoviesI } from "../../../backend/app/api/types/MovieI";
import APP_CONFIGS from "../../variables/configs";
import Listing from "../../components/listing/Listing";
import styled from "styled-components";

interface ResultPersonI {
  page: number;
  results: ResultsPersonI[];
  total_pages: number;
  total_results: number;
}

interface ErrorPersonI {
  status_code?: number;
  status_message?: string;
  success?: boolean;
}

interface ResultsPersonI {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  known_for: KnownForI[];
}

interface KnownForI {
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  title: string;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export default function SearchMovies() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [actor, setActor] = useState("");
  const [director, setDirector] = useState("");
  const [movies, setMovies] = useState<MovieResultsI[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchPerson = async (name: string): Promise<ResultsPersonI[]> => {
    const url = `https://api.themoviedb.org/3/search/person?`;
    const params = {
      api_key: APP_CONFIGS.api_key,
      query: name,
    };

    try {
      const response: ResultPersonI = await fetchData(url, params);
      return response.results;
    } catch (err) {
      const error: ErrorPersonI = err as ErrorPersonI;
      if (error) {
        setError(error.status_message);
      }
      return [];
    }
  };

  const formatIds = (ids: number[]) => {
    return JSON.stringify(ids)
      .replace("[", "")
      .replace("]", "")
      .replace(",", "|");
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const search = formData.get("search") as string;
    const genre = formData.get("genre") as string;
    const year = formData.get("year") as string;
    const actor = formData.get("actor") as string;
    const director = formData.get("director") as string;

    setSearch(search);
    setGenre(genre);
    setYear(year);
    setActor(actor);
    setDirector(director);
  };

  useEffect(() => {
    const searchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const actorResults: any = await fetchPerson(actor).then((res) => {
          return res
            .filter((person) => person.known_for_department === "Acting")
            .map((person) => person.id);
        });

        const directorResults: any = await fetchPerson(director).then((res) => {
          return res
            .filter((person) => person.known_for_department === "Directing")
            .map((person) => person.id);
        });

        const actorList = formatIds(actorResults);
        const directorList = formatIds(directorResults);

        const url = search
          ? `https://api.themoviedb.org/3/search/movie?`
          : `https://api.themoviedb.org/3/discover/movie?`;
        const params = search
          ? {
              api_key: APP_CONFIGS.api_key,
              query: search,
            }
          : {
              api_key: APP_CONFIGS.api_key,
              with_genres: genre,
              primary_release_year: year,
              with_cast: actorList,
              with_crew: directorList,
            };

        const resultat = await fetchData<MoviesI>(url, params);

        if (resultat) {
          setMovies(resultat.results);
        }
      } catch (err) {
        const error: ErrorPersonI = err as ErrorPersonI;
        if (error) {
          setError(error.status_message);
        }
      } finally {
        setLoading(false);
      }
    };

    searchMovies();
  }, [search, genre, year, actor, director]);

  return (
    <>
      <h1>Search Movies</h1>
      <SearchMoviesStyled onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search Movies"
        />

        <p>or</p>
        <select name="genre" id="genre">
          <option value="">Select Genre</option>
          {[
            { id: 28, name: "Action" },
            { id: 12, name: "Adventure" },
            { id: 16, name: "Animation" },
            { id: 35, name: "Comedy" },
            { id: 80, name: "Crime" },
            { id: 99, name: "Documentary" },
            { id: 18, name: "Drama" },
            { id: 10751, name: "Family" },
            { id: 14, name: "Fantasy" },
            { id: 36, name: "History" },
            { id: 27, name: "Horror" },
            { id: 10402, name: "Music" },
            { id: 9648, name: "Mystery" },
            { id: 10749, name: "Romance" },
            { id: 878, name: "Science Fiction" },
            { id: 10770, name: "TV Movie" },
            { id: 53, name: "Thriller" },
            { id: 10752, name: "War" },
            { id: 37, name: "Western" },
          ].map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="year"
          id="year"
          placeholder="Year of Release"
        />
        <input type="text" name="actor" id="actor" placeholder="Actor" />
        <input
          type="text"
          name="director"
          id="director"
          placeholder="Director"
        />
        <button type="submit">Search</button>
      </SearchMoviesStyled>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <Listing movies={movies} className="vertical" />
      )}
    </>
  );
}

const SearchMoviesStyled = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 0;

  input {
    padding: 10px 15px;
    border: 1px solid #ccc;
    border-radius: 5px 0 0 5px;
    outline: none;
  }

  button {
    padding: 10px 15px;
    border: 1px solid #ccc;
    border-radius: 0 5px 5px 0;
    outline: none;
    cursor: pointer;
  }
`;
