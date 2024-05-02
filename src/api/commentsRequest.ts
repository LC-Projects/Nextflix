import { fetchDB } from "./utilis";

export interface CommentsI {
  message: string;
  data: CommentI[];
  code: number;
}

export interface CommentI {
  userId: string;
  movieId: number;
  comment: string;
  rating: number;
}

// add to favorite
export async function getCommentsByMovie(movie_id: string): Promise<CommentI[]>{
    const url = `http://localhost:3333/api/movies/comments/byfilm/${movie_id}`;

    const res: CommentsI = await fetchDB(url, {}, "GET");
    console.log('res', res)
    if (res) {
        return res.data;
    }else{
        return [];
    }
}

export async function getCommentsByUser(user_id: string): Promise<CommentI[]>{
    const url = `http://localhost:3333/api/movies/comments/${user_id}`;

    const res: CommentsI = await fetchDB(url, {}, "GET");

    if (res) {
        return res.data;
    }else{
        return [];
    }
}
