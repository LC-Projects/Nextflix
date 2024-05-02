import { FaHeart, FaPlus, FaCheck } from "react-icons/fa";
import { MovieResultsI } from "../../types/MovieResultsI";
import APP_CONFIGS from "../../variables/configs";
import styled from "styled-components";
import colors from "../../variables/colors";
import { useState, useEffect } from "react";
import { addFavoriteMovie, addToWatchMovie } from "../../api/moviesRequest";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setReload } from "../../features/auth/authSlices";
import { Link } from "react-router-dom";

export interface FavoriteI {
  id: number;
  favorite: boolean;
}

export default function Card({
  data
}: {
  data: MovieResultsI
}) {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [favorite, setFavorite] = useState(data.is_favorite ? true : false);
  const [toWatch, setToWatch] = useState(data.to_watch ? true : false);

  const handleFavorite = () => {
    if (auth.id) {
      addFavoriteMovie(auth.id, data.id);
    }
    dispatch(setReload(!auth.reload));
    setFavorite(!favorite);
  };

  const handleToWatch = () => {
    if(auth.id) {
      addToWatchMovie(auth.id, data.id);
    }
    dispatch(setReload(!auth.reload));
    setToWatch(!toWatch);
  };

  useEffect(() => {
    // console.log('========>',data);
  }, [auth.reload, favorite]);

  return (
    <CardStyled>
      <div
        onClick={handleFavorite}
        className="favorite"
        style={favorite ? { color: colors.red } : { color: colors.white }}
      >
        <FaHeart />
      </div>
      <div onClick={handleToWatch} className="to_watch">
        {toWatch ? <FaCheck /> : <FaPlus />}
      </div>
      <Link to={`movie/${data.id}`}>
        <img src={`${APP_CONFIGS.img_url}/w185${data.poster_path}`} />
        <div>{data.title}</div>
      </Link>
    </CardStyled>
  );
}

const CardStyled = styled.article`
  width: 100%;
  position: relative;

  img {
    height: 250px;
    aspect-ratio: 2/3;
    object-fit: cover;
    border-radius: 10px;
  }

  .favorite {
    position: absolute;
    top: 10px;
    left: 10px;
    color: #fff;
    scale: 1.5;
    cursor: pointer;

    &:hover {
      color: ${colors.red};
    }
  }
  .to_watch {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #fff;
    scale: 1.5;
    cursor: pointer;
  }
`;
