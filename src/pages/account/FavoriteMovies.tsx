import Listing from "../../components/listing/Listing"
import useAccount from "../../hooks/useAccount"
import useGetFavoriteMovies from "../../hooks/useGetFavoriteMovies"
import { AccountFavoriteMoviesI } from "../../types/account/AccountFavoriteMoviesI"

export default function FavoriteMovies() {
    const { account } = useAccount<AccountFavoriteMoviesI>("favorite/movies")
    const { favoriteMoviesData } = useGetFavoriteMovies()

    return (
        <div>
            {account?.results?.length === 0 ? <h1>No Favorite Movies</h1> : <Listing movies={account.results} favoriteData={favoriteMoviesData} className="vertical" />}
        </div>
    )
}

