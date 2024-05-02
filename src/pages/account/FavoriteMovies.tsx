import { useAppSelector } from "../../app/hooks"
import Listing from "../../components/listing/Listing"
import useAccount from "../../hooks/useAccount"
import { AccountI } from "../../types/account/AccountFavoriteMoviesI"

export default function FavoriteMovies() {
    const { account } = useAccount<AccountI>({
        user_id: useAppSelector((state) => state.auth.id)
    })

    return (
        <div>
            {account.user ? (
                <Listing movies={account.user.movie_favoris} className="vertical" />
            ) : (
                <h1>No Favorite Movies</h1>
            )}
        </div>
    )
}

