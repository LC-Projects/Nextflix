import { AuthenticationI } from "../types/auth";
import { fetchData, fetchDB } from "./utilis";

export async function loginViaApi(api_key: string) {
    const url = "https://api.themoviedb.org/3/authentication?";
    const params = {
        api_key,
    };
 

    return await fetchData<AuthenticationI>(url, params);
}

export async function loginDB(email: string, password: string) {
    const url = "http://localhost:3333/api/login"; 
    const body = {
        email,
        password
    }
    return await fetchDB<AuthenticationI>(url, body, "POST");
}

// loginDN with token
export async function loginWithToken(token: string) {
    const url = "http://localhost:3333/api/login_with_token"; 
    const body = {
        token
    }
    return await fetchDB<AuthenticationI>(url, body, "POST");
}