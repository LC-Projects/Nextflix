import APP_CONFIGS from "../variables/configs"
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
    const url = `${APP_CONFIGS.backend_url}/api/movies/to_watch/${user_id}`;

    const res: ToWatchesI = await fetchDB(url, {}, "GET");

    if (res) {
        return res.data;
    }else{
        return [];
    }
}