import styled from "styled-components"
import { CommentI } from "../../../api/commentsRequest"

function Comments({ comments }: { comments: CommentI[] | undefined }) {
    return (
        <>
            <h2>Comments {comments?.length !== 0 && (<>({comments?.length})</>)} </h2>
            {comments?.length === 0 ? <p>No comments yet</p> : (

                <CommentsStyled className='comments'>
                    {comments?.map((comment, index) => (
                        <li key={index}>
                            <div>
                                <p>{comment.comment}</p>
                                <div>
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <span key={i} style={{ color: i < comment.rating ? "yellow" : "gray", fontSize: "1.5em" }}>
                                            {i < comment.rating ? "★" : "☆"}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </li>
                    ))}
                </CommentsStyled>
            )}
        </>
    )
}

export default Comments

const CommentsStyled = styled.div`
    list-style: none;
    padding: 0;
    margin: 0;
    display: inline-flex;
    flex-wrap: nowrap;
    overflow-x: hidden;
    gap: 24px;
    width: -webkit-fill-available;


    li {
        margin-bottom: 24px;
        padding: 24px;
        background-color: rgba(255, 255, 255, .2);
        border-radius: 16px;
        min-width: max-content;

        > div {
            display: grid;
            p {
                margin: 0;
            }

            p:last-child {
                text-align: right;
            }
        }
    }
`