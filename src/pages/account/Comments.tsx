import { useEffect, useState } from "react"
import { useAppSelector } from "../../app/hooks"
import { CommentI, getCommentsByUser } from "../../api/commentsRequest"

export default function Comments() {
    const { id } = useAppSelector((state) => state.auth);
    const [comments, setComments] = useState<CommentI[]>();
    const [backgroundImage, setBackgroundImage] = useState<string>();

    useEffect(() => {
        if (id) {
            getCommentsByUser(id).then((res) => {
                setComments(res);
                console.log('res', res)
                // setBackgroundImage(res.movie.backdrop_path);
            });
        }
    }, [])

    return (
        <div>
            <ul>
                {comments?.map((comment, index) => (
                    <li key={index}>
                        <div>
                            <div style={{ backgroundImage: `url("${backgroundImage}")` }}></div>
                            <div>
                                <h2>{comment.movie.title}</h2>
                                <p>{comment.comment}</p>
                                <p>{comment.rating}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
