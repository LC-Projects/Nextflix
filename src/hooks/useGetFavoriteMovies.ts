import { useEffect, useState } from 'react';
import { FavoriteI } from '../components/listing/Card';
import useAccount from './useAccount';
import { AccountFavoriteMoviesI } from '../types/account/AccountFavoriteMoviesI';
import { useAppSelector } from '../app/hooks';

export default function useGetFavoriteMovies(): { favoriteMoviesData: FavoriteI[] } {
    const { account } = useAccount<AccountFavoriteMoviesI>("favorite/movies")
    const [favoriteMoviesData, setFavoriteMoviesData] = useState<FavoriteI[]>([])
    const auth = useAppSelector((state) => state.auth)

    useEffect(() => {
        account.results?.map((item) => {
            setFavoriteMoviesData((prev: FavoriteI[]) => [...prev, { id: item.id, favorite: true }] as FavoriteI[]);
        });
    }, [account, auth.reload]);

    return { favoriteMoviesData }
}
