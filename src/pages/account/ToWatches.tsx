import { MovieResultsI } from "../../../backend/app/api/types/MovieI";
import { useAppSelector } from "../../app/hooks"
import Listing from "../../components/listing/Listing"
import useAccount from "../../hooks/useAccount"
import useGetToWatchMovies from "../../hooks/useGetToWatchMovies";
import { AccountI } from "../../types/account/AccountFavoriteMoviesI"

export default function ToWatchMovies() {
    const { account } = useAccount<AccountI>({
        user_id: useAppSelector((state) => state.auth.id)
    });
    const { movies }: { movies: MovieResultsI[] } = useGetToWatchMovies();

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
