import styled from "styled-components";
import { useEffect, useState } from "react";
import useGetMovies from "../../hooks/useGetMovies";
import { MovieResultsI } from "../../types/MovieResultsI";
import APP_CONFIGS from "../../variables/configs";

export default function Slider() {
    const [sliderMovies, setSliderMovies] = useState<MovieResultsI>({} as MovieResultsI);
    const [slide, setSlide] = useState<number>(0);
    const { movies } = useGetMovies();

    useEffect(() => {
        if (!movies?.length) return;
        setSliderMovies(movies[slide]);

        const interval = setInterval(() => {
            setSlide((slide) => (slide + 1) % movies.length);
            setSliderMovies(movies[slide]);
        }, 10000);
        
        return () => clearInterval(interval);
    }, [movies, slide]);

    return (
        <SliderStyled style={sliderMovies.backdrop_path ? { backgroundImage: `url("${APP_CONFIGS.img_url}/original${sliderMovies.backdrop_path}")` } : {}}>
            <div>
                <h1>{sliderMovies.title}</h1>
                <p>{sliderMovies.overview}</p>
                <p>Release date: {new Date(sliderMovies.release_date).toLocaleDateString("en-EN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>

                <div>
                    <button>Play</button>
                    <button>My List</button>
                </div>
            </div>
        </SliderStyled>
    )
}

const SliderStyled = styled.section`
    background-color: #000;
    height: 75vh;
    min-height: 500px;
    width: 100%;
    color: #fff;
    font-size: 1.2rem;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        background: linear-gradient(to right, #000, transparent);
        width: 100%;
        height: 100%;
    }

    > div {
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
        padding: 0 20px;
        max-width: 35vw;

        h1 {
            font-size: 3rem;
        }

        p {
            font-size: 1rem;
        }

        > div {
            display: flex;
            gap: 10px;
            margin-top: 20px;
            flex-direction: row;

            button {
                padding: 10px 20px;
                border-radius: 5px;
                border: none;
                color: #fff;
                background-color: rgba(51,51,51,0.5);
                font-size: 1.2rem;
                cursor: pointer;
            }
        }

    }
`;