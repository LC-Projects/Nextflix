import { MovieResultsI } from "../../../backend/app/api/types/MovieI"
import { useAppSelector } from "../../app/hooks"
import Listing from "../../components/listing/Listing"
import useAccount from "../../hooks/useAccount"
import useGetFavoriteMovies from "../../hooks/useGetFavoriteMovies"
import { AccountI } from "../../types/account/AccountFavoriteMoviesI"

export default function FavoriteMovies() {
    const { account } = useAccount<AccountI>({
        user_id: useAppSelector((state) => state.auth.id)
    })
    const { movies }: { movies: MovieResultsI[] } = useGetFavoriteMovies();

    return (
        <div>
            {account.user ? (
                <Listing movies={movies} className="vertical" />
            ) : (
                <h1>No Favorite Movies</h1>
            )}
        </div>
    )
}

