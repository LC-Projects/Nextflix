import { useEffect, useState } from "react"
import { useAppSelector } from "../../app/hooks"
import { CommentI, getCommentsByUser } from "../../api/commentsRequest"
import APP_CONFIGS from "../../variables/configs";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Comments() {
    const { id } = useAppSelector((state) => state.auth);
    const [comments, setComments] = useState<CommentI[]>();

    useEffect(() => {
        if (id) {
            getCommentsByUser(id).then((res) => {
                setComments(res);
            });
        }
    }, [])

    return (
        <CommentsStyled>
            <ul>
                {comments?.map((comment, index) => (
                    <li key={index}>
                        <Link to={`/movie/${comment.movie.id}`}>
                            <div>
                                <div className="cover" style={{ backgroundImage: `url("${APP_CONFIGS.img_url}/original${comment.movie.poster_path}")` }}></div>
                                <div className="info">
                                    <h2>{comment.movie.title}</h2>
                                    <div className="comment">
                                        <p>{comment.comment}</p>
                                        <div>
                                            {Array.from({ length: 5 }, (_, i) => (
                                                <span key={i} style={{ color: i < comment.rating ? "yellow" : "gray", fontSize: "1.5em" }}>
                                                    {i < comment.rating ? "★" : "☆"}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </CommentsStyled>
    )
}


const CommentsStyled = styled.div`
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        margin-top: 14px;
        display: grid;
        gap: 14px;
        grid-template-columns: repeat(2, minmax(300px, 1fr));

        * {
            text-decoration: none;
            color: initial;
        }

        li {
            display: flex;
            background-color: rgba(0,0,0, .2);

            div {
                display: flex;

                &.cover {
                    margin-right: 10px;
                    width: 100px;
                    height: 150px;
                    background-size: cover;
                    background-position: center;
                }

                &.info {
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                    justify-content: space-between;
                    padding: 14px;


                    h2 {
                        font-size: 1.2rem;
                        margin: 0;
                    }
                }

                .comment {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;

                    p {
                        margin: 0;
                    }

                    div {
                        display: flex;
                        gap: 5px;
                    }
                }
            }
        }
    }
`