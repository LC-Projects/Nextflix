import { ConfigurationI } from "./types/ConfigurationI.js";
import APP_CONFIGS from "./variables.js";

export async function fetchData<D>(url: string, params: {} = {}): Promise<D> {
    const token =  APP_CONFIGS.token;
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
    const token =  APP_CONFIGS.token;
    const options = {
        method,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        body: JSON.stringify(bodyJSON)
        }

    return await fetch(url, options)
        .then((response) => response.json())
        .then((data) => {return data as D})
        .catch((error) => error);
};


export async function getImages(imgPath:string, imgSize?: string) {
    const configUrl = "https://api.themoviedb.org/3/configuration?";
    const configRes = await fetchData<ConfigurationI>(configUrl, {api_key: APP_CONFIGS.api_key});
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
        body: JSON.stringify(body)
        }
    return await fetch(url, options)
        .then((response) => response.json())
        .then((data) => {return data as D})
        .catch((error) => error);
};