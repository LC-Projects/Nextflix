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
    const token =  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWY4MjJlYzZhNzRlYjFhMDZiNDE5N2IzZDdkY2RmNSIsInN1YiI6IjY1OTZjMGRiNTkwN2RlNWJhNjYzYmY4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EIb4K1jsgOWShqn-crPZ0Ha6Bo3n4v77bDpJmNMOk3Y"
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
        body: JSON.stringify(body)
        }
    return await fetch(url, options)
        .then((response) => response.json())
        .then((data) => {return data as D})
        .catch((error) => error);
};