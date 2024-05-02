import { useEffect, useState } from 'react';
import useAccount from './useAccount';
import { AccountI } from '../types/account/AccountFavoriteMoviesI';
import { useAppSelector } from '../app/hooks';
import { MovieResultsI } from "../../backend/app/api/types/MovieI";


export default function useGetFavoriteMovies(): { favoriteMoviesData: MovieResultsI[] } {
    const { account } = useAccount<AccountI>({
        user_id: useAppSelector((state) => state.auth.id)
    });
    const [favoriteMoviesData, setFavoriteMoviesData] = useState<MovieResultsI[]>([]);
    const auth = useAppSelector((state) => state.auth);

    useEffect(() => {
        setFavoriteMoviesData([]); // Clear the favoriteMoviesData state before adding new items

        account.user?.movie_favoris.map((item) => {
            setFavoriteMoviesData((prev: MovieResultsI[]) => [...prev, item] as MovieResultsI[]);
        });
    }, [account, auth.reload]);

    return { favoriteMoviesData };
}
