import { useEffect, useState } from "react"
import { useAppSelector } from "../../app/hooks"
import { CommentI, getCommentsByUser } from "../../api/commentsRequest"

export default function Comments() {
    const { id } = useAppSelector((state) => state.auth);
    const [comments, setComments] = useState<CommentI[]>();

    useEffect(() => {
        if(id){
            getCommentsByUser(id).then((res) => {
                setComments(res);
            });
        }
    }, [])
    
    return (
        <div>
            <ul>
                {comments?.map((comment, index) => (
                    <li key={index}>
                        <p>{comment.comment}</p>
                        <p>{comment.rating}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
