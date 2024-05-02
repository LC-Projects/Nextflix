import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovie } from '../../api/moviesRequest';
import { MovieI } from './MovieI';
import APP_CONFIGS from '../../variables/configs';
import CommentForm from './CommentForm';
import { CommentI, getCommentsByMovie } from '../../api/commentsRequest';

export default function Movie() {
    const { id } = useParams();
    const [movieInfo, setMovieInfo] = useState<MovieI>();
    const [comments, setComments] = useState<CommentI[]>();

    useEffect(() => {
        if (id) {
            getMovie(id).then((res) => {
                setMovieInfo(res as MovieI);
            });

            getCommentsByMovie(id).then((res) => {
                console.log('=======>', res)
                setComments(res) 
            });
            
        }else{
            window.history.back();
        }

    }, []);

    return (
        <>
            <h1>{movieInfo?.title}</h1>
            <img src={APP_CONFIGS.img_url+ "/original" + movieInfo?.backdrop_path} alt="" width="auto" height="400" />
            <p>{movieInfo?.overview}</p>

            <CommentForm movieId={id ?? ''} />
            <ul>
                
                {comments?.map((comment, index) => (
                    <li key={index}>
                        <p>{comment.comment}</p>
                        <p>{comment.rating}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}

