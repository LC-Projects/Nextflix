import { AuthenticationI } from "../types/auth";
import { fetchData } from "./utilis";

export async function loginViaApi(api_key: string) {
    const url = "https://api.themoviedb.org/3/authentication?";
    const params = {
        api_key,
    };
 

    return await fetchData<AuthenticationI>(url, params);
}