import { useEffect, useState } from 'react';
import { FavoriteI } from '../components/listing/Card';
import useAccount from './useAccount';
import { AccountI } from '../types/account/AccountFavoriteMoviesI';
import { useAppSelector } from '../app/hooks';

export default function useGetFavoriteMovies(): { favoriteMoviesData: FavoriteI[] } {
    const { account } = useAccount<AccountI>({
        user_id: useAppSelector((state) => state.auth.id)
    })
    const [favoriteMoviesData, setFavoriteMoviesData] = useState<FavoriteI[]>([])
    const auth = useAppSelector((state) => state.auth)

    useEffect(() => {
        account.user?.movie_favoris.map((item) => {
            setFavoriteMoviesData((prev: FavoriteI[]) => [...prev, { id: item.movieId, favorite: true }] as FavoriteI[]);
        });
    }, [account, auth.reload]);

    return { favoriteMoviesData }
}
