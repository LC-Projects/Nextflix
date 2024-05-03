import APP_CONFIGS from "../variables/configs";
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
  movie: {
    id: number;
    poster_path: string;
    backdrop_path: string;
    title: string;
    original_title: string;
  };
}

// add to favorite
export async function getCommentsByMovie(movie_id: string): Promise<CommentI[]>{
    const url = `${APP_CONFIGS.backend_url}/api/movies/comments/byfilm/${movie_id}`;

    const res: CommentsI = await fetchDB(url, {}, "GET");
    console.log('res', res)
    if (res) {
        return res.data;
    }else{
        return [];
    }
}

export async function getCommentsByUser(user_id: string): Promise<CommentI[]>{
    const url = `${APP_CONFIGS.backend_url}/api/movies/comments/${user_id}`;

    const res: CommentsI = await fetchDB(url, {}, "GET");

    if (res) {
        return res.data;
    }else{
        return [];
    }
}
