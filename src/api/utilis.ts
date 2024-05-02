import { ConfigurationI } from "../types/configuration/ConfigurationI";

export async function fetchData<D>(url: string, params: {} = {}): Promise<D> {
    const token =  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWY4MjJlYzZhNzRlYjFhMDZiNDE5N2IzZDdkY2RmNSIsInN1YiI6IjY1OTZjMGRiNTkwN2RlNWJhNjYzYmY4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EIb4K1jsgOWShqn-crPZ0Ha6Bo3n4v77bDpJmNMOk3Y"
    const options = {
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        }
    return await fetch(url + new URLSearchParams(params), options)
        .then((response) => response.json())
        .then((data) => {return data as D})
        .catch((error) => error);
};

export async function GiveData<D>(url: string, method: "POST" = "POST", bodyJSON: object = {}): Promise<D> {
    const options = {
        method,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json'
          },
        body: JSON.stringify(bodyJSON)
        }

    return await fetch(url, options)
        .then((response) => response.json())
        .then((data) => {return data as D})
        .catch((error) => error);
};


export async function getImages(api_key: string, imgPath:string, imgSize?: string) {
    const configUrl = "https://api.themoviedb.org/3/configuration?";
    const configRes = await fetchData<ConfigurationI>(configUrl, {api_key});
    if (configRes) {
        const { images } = configRes;
        const { secure_base_url, poster_sizes } = images;
        const imgSizeToUse = imgSize ? imgSize : poster_sizes[3];
        return secure_base_url + imgSizeToUse + imgPath;
    }
}

export async function fetchDB<D>(url: string, body: {} = {}, method="GET"): Promise<D> {
    const options = {
        method: method,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
        },
        body: method === "GET" ? undefined : JSON.stringify(body)
    }
    return await fetch(url, options)
        .then((response) => response.json())
        .then((data) => {return data as D})
        .catch((error) => error);
};

// function to create cookie
export function createCookie(name: string, value: string) {
    document.cookie = name + "=" + value  + "; path=/";
    
}

// function to read cookie
export function readCookie(name: string) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)===' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

// function to remove cookie
export function eraseCookie(name: string) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}