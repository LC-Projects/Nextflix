import styled from "styled-components";
import Listing from "../../components/listing/Listing";
import { FormEvent, useEffect, useState } from "react";
import { fetchData } from "../../api/utilis";
import { useAppSelector } from "../../app/hooks";
import { MovieResultsI } from "../../types/MovieResultsI";
import { MoviesI } from "../../types/MoviesI";

export default function SearchMovies() {
    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState<MovieResultsI[]>([]);
    const auth = useAppSelector((state) => state.auth);

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearch(e.currentTarget.search.value);
    }

    useEffect(() => {
        const searchMovies = async () => {
            const url = `https://api.themoviedb.org/3/search/movie?`;
            const params = {
                api_key: auth.api_key,
                query: search,
            }

            const resultat = await fetchData<MoviesI>(url, params)

            if (resultat) {
                setMovies(resultat.results)
            }
        }

        searchMovies();
    }, [search]);



    return (
        <>
            <h1>Search Movies</h1>
            <SearchMoviesStyled onSubmit={handleSearch}>
                <input type="text" name="search" id="search" placeholder="Search Movies" />
                <button type="submit">Search</button>
            </SearchMoviesStyled>

            <Listing movies={movies} className="vertical" />
        </>
    )
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