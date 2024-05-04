import Listing from "../../components/listing/Listing";
import useGetMovies from "../../hooks/useGetMovies";

export default function Movies() {

  const {movies} = useGetMovies();


  return (
    <div>
      <Listing movies={movies} className="vertical" />
    </div>
  );
}
