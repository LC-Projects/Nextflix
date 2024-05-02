import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MovieResultsI } from "../../types/MovieResultsI";
import Card, { FavoriteI } from "./Card";
import { useEffect } from "react";
import { Link } from "react-router-dom";

interface ListingProps {
  movies: MovieResultsI[];
  className?: "horizontal" | "vertical";
  favoriteData?: FavoriteI[]
}

export default function Listing({ movies, className, favoriteData }: ListingProps) {

  const scrollHorizontally = (
    e: React.MouseEvent<HTMLButtonElement>,
    direction: "left" | "right"
  ) => {
    const container =
      ((e.target as HTMLElement)?.parentElement?.previousSibling as HTMLElement)
        ?.tagName === "svg"
        ? ((e.target as HTMLElement)?.parentElement?.parentElement
            ?.previousSibling as HTMLElement)
        : ((e.target as HTMLElement)?.parentElement
            ?.previousSibling as HTMLElement);

    const scrollDistance = 300;
    const scrollAmount =
      direction === "left" ? -scrollDistance : scrollDistance;
    container?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  useEffect(() => {
    console.log(favoriteData)
  }, [favoriteData])

  return (
    <div>
      <DashboardStyled className={className && className}>
        {movies?.map((movie) => (
          <li key={movie.id}>
              <Card data={movie} favoriteData={favoriteData} />
          </li>
        ))}
      </DashboardStyled>

      
      {className === "horizontal" && (
        <ControleStyled>
          <FaChevronLeft
            style={{ cursor: "pointer" }}
            fontSize="2rem"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              scrollHorizontally(e, "left")
            }
          />
          <FaChevronRight
            style={{ cursor: "pointer" }}
            fontSize="2rem"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              scrollHorizontally(e, "right")
            }
          />
        </ControleStyled>
      )}
    </div>
  );
}

const DashboardStyled = styled.ul`
  display: flex;
  gap: 10px;
  overflow-x: hidden;
  padding-top: 25px;

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;

    a{
      text-decoration: none;
      color: inherit;
    }
  }

  &.horizontal {
    img {
      width: unset;
    }
  }

  &.vertical {
    display: grid;
    grid-template-columns: repeat(6, 1fr);

    gap: 10px;
  }
`;

const ControleStyled = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    margin-top: 10px;
    gap: 25px;
    padding-bottom: 25px;
`;