import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovie } from '../../api/moviesRequest';
import { MovieI } from './MovieI';
import APP_CONFIGS from '../../variables/configs';
import CommentForm from './CommentForm';
import { CommentI, getCommentsByMovie } from '../../api/commentsRequest';
import styled from "styled-components";
import TagList from './partials/TagList';
import colors from '../../variables/colors';
import InfoCards from './partials/InfoCards';
import { useAppSelector } from '../../app/hooks';
import Comments from './partials/Comments';


export default function Movie() {
    const auth = useAppSelector((state) => state.auth);
    const { id } = useParams();
    const [movieInfo, setMovieInfo] = useState<MovieI>();
    const [comments, setComments] = useState<CommentI[]>();
    const [bgImg, setBgImg] = useState("")

    useEffect(() => {
        if (id) {
            getMovie(id).then((res) => {
                console.log(res);
                setMovieInfo(res as MovieI);
                setBgImg(APP_CONFIGS.img_url + "/original" + (res as MovieI)?.backdrop_path);
            });

            getCommentsByMovie(id).then((res) => {
                setComments(res)
            });

        } else {
            window.history.back();
        }

    }, [auth.reload]);

    return (
        <>
            <HeaderStyled className='header' style={{ backgroundImage: `url('${bgImg}')` }}>

                <div>
                    <span>{movieInfo?.tagline}</span>
                    <h1>{movieInfo?.title}</h1>
                    <TagList movieInfo={movieInfo} />
                </div>


                <div></div>

                <div style={{ gridArea: "info" }}>
                    <InfoCards movieInfo={movieInfo} />
                </div>


            </HeaderStyled>

            <MovieStyled>
                <h2>Overview</h2>
                <p>{movieInfo?.overview}</p>

                
                <Comments comments={comments} />
                <CommentForm movieId={id ?? ''} />

            </MovieStyled>
        </>
    );
}


const HeaderStyled = styled.section`
    min-height: 400px;
    height: 75vh;
    margin: 0;
    position: relative;

    display: grid;
    grid-template-areas: 
        "title ." 
        "info info";

    grid-template-columns: 3fr 1fr;
    grid-template-rows: 9fr 1fr;
    gap: 24px;
    align-items: end;
    background-size: cover;
    background-position: center;

    * {
        color: #fff;
    }

    > div {
        z-index: 0;
        transform: translateY(50px);
    }

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        background: linear-gradient(to top, ${colors.lightblack}, transparent, ${colors.lightblack});
        width: 100%;
        height: 100%;
    }

    h1 {
        font-size: 4rem;
        margin: 0;
        text-transform: uppercase;
    }
`;

const MovieStyled = styled.section`
    background-color: ${colors.lightblack};
    padding-top: calc(75px + 50px);
    padding-bottom: 75px;

    h2 {
        &:not(:first-child) {
            margin-top: 55px;
        }
        font-size: 1.4rem;
        color: ${colors.lightwhite};
        text-transform: uppercase;
        opacity: .4;
        margin-bottom: 24px;
    }

    p {
        color: ${colors.lightwhite};
        margin-bottom: 24px;
        width: 80%;
        line-height: 140%;
    }

    > * {
        color: #fff;
    }
`;