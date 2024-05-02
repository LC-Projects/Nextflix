import { useAppSelector } from "../../app/hooks"
import Listing from "../../components/listing/Listing"
import useAccount from "../../hooks/useAccount"
import useGetFavoriteMovies from "../../hooks/useGetFavoriteMovies"
import { AccountI } from "../../types/account/AccountFavoriteMoviesI"

export default function ToWatchMovies() {
    const { account } = useAccount<AccountI>({
        user_id: useAppSelector((state) => state.auth.id)
    })
    const { favoriteMoviesData } = useGetFavoriteMovies()

    return (
        <div>
            {account.user ? (
                <Listing movies={account.user.movie_to_watch} favoriteData={favoriteMoviesData} className="vertical" />
            ) : (
                <h1>No Favorite Movies</h1>
            )}
        </div>
    )
}
