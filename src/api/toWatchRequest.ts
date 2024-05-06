import { fetchDB } from "./utilis"

export interface ToWatchesI {
    message: string
    data: ToWatchI[]
    code: number
  }
  
  export interface ToWatchI {
    userId: number
    movieId: number
  }

  
export async function getToWatchByUser(user_id: string): Promise<ToWatchI[]>{
    const url = `http://localhost:3333/api/movies/to_watch/${user_id}`;

    const res: ToWatchesI = await fetchDB(url, {}, "GET");

    if (res) {
        return res.data;
    }else{
        return [];
    }
}