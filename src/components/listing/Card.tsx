import { FaHeart } from "react-icons/fa";
import { MovieResultsI } from "../../types/MovieResultsI";
import APP_CONFIGS from "../../variables/configs";
import styled from "styled-components";
import colors from "../../variables/colors";
import { useState, useEffect } from "react";
import { addFavoriteMovie } from "../../api/moviesRequest";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setReload } from "../../features/auth/authSlices";

export interface FavoriteI {
    id: number;
    favorite: boolean;
}

export default function Card({ data, favoriteData }: { data: MovieResultsI, favoriteData?: FavoriteI[] }) {
    const auth = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch();
    const [favorite, setFavorite] = useState(favoriteData ? true : false);

    const handleFavorite = () => {
        addFavoriteMovie(auth.account_id!, data.id, !favorite);
        dispatch(setReload(!auth.reload))
        setFavorite(favorite);
    };

    useEffect(() => {
        if (favoriteData) {
            favoriteData.map((item) => {
                if (item.id === data.id) {
                    setFavorite(true);
                }
            });
        }
    }, [favoriteData, auth.reload, favorite]);


  return (
    <CardStyled>
      <div onClick={handleFavorite} className="favorite" style={favorite ? {color: colors.red} : {color: colors.white}}>
        <FaHeart />
      </div>
      <img src={`${APP_CONFIGS.img_url}/w185${data.poster_path}`} />
      <div>{data.title}</div>
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
    right: 10px;
    color: #fff;
    scale: 1.5;
    cursor: pointer;

    &:hover {
      color: ${colors.red};
    }
  }
`;
