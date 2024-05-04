import { AuthenticationI } from "../types/auth";
import { fetchData, fetchDB } from "./utilis";

export default interface authUpdateI {
    user_id: string;
    email?: string;
    last_name?: string;
    first_name?: string;
    nick_name?: string;
}

export async function loginViaApi(api_key: string) {
    const url = "https://api.themoviedb.org/3/authentication?";
    const params = {
        api_key,
    };
 

    return await fetchData<AuthenticationI>(url, params);
}

export async function AuthDB<ResponseI>(endpoint: string, body: any, method: string = "POST") {
    const url = `http://localhost:3333/api/${endpoint}`; 
    return await fetchDB<ResponseI>(url, body, method);
}

// loginDN with token
export async function loginWithToken(token: string) {
    const url = "http://localhost:3333/api/login_with_token"; 
    const body = {
        token
    }
    return await fetchDB<AuthenticationI>(url, body, "POST");
}

// edit user
export async function editUser<ResponseI>(body: authUpdateI) {
    const url = `http://localhost:3333/api/account/update/`;
    return await fetchDB<ResponseI>(url, body, "PUT");
}