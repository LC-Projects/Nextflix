import { useEffect, useState } from 'react';
import useAccount from './useAccount';
import { AccountI } from '../types/account/AccountFavoriteMoviesI';
import { useAppSelector } from '../app/hooks';
import { ToWatchI } from '../api/toWatchRequest';

export default function useGetToWatchMovies(): { toWatchMoviesData: ToWatchI[] } {
    const { account } = useAccount<AccountI>({
        user_id: useAppSelector((state) => state.auth.id)
    })
    const [toWatchMoviesData, setToWatchMoviesData] = useState<ToWatchI[]>([])
    const auth = useAppSelector((state) => state.auth)

    useEffect(() => {
        account.user?.movie_favoris.map((item) => {
            setToWatchMoviesData((prev: ToWatchI[]) => [...prev, { id: item.movieId, favorite: true }] as ToWatchI[]);
        });
    }, [account, auth.reload]);

    return { toWatchMoviesData }
}
