import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect } from "react";
import YouTube from "react-youtube";


const VideoPlayer = ({ videoId } : { videoId: string }) => {
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 0,
        },
    };

    return <YouTube videoId={videoId} opts={opts} />;
};

interface ListingProps {
    urls: string[];
    className?: "horizontal" | "vertical";
}

export default function IframeCarousel({ urls, className }: ListingProps) {

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

        const scrollDistance = 640;
        const scrollAmount =
            direction === "left" ? -scrollDistance : scrollDistance;
        container?.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    useEffect(() => {
    }, [])

    return (
        <>
            <ContainerStyled className={className}>
                {urls.map((url, index) => (
                    <VideoPlayer key={index} videoId={url} />
                ))}
            </ContainerStyled>

            <ControleStyled>
                <FaChevronLeft
                    style={{ cursor: "pointer" }}
                    fontSize="2rem"
                    onClick={(e: any) =>
                        scrollHorizontally(e, "left")
                    }
                />
                <FaChevronRight
                    style={{ cursor: "pointer" }}
                    fontSize="2rem"
                    onClick={(e: any) =>
                        scrollHorizontally(e, "right")
                    }
                />
            </ControleStyled>
        </>
    );
}

const ContainerStyled = styled.ul`
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
    iframe {
      width: unset;
    }
  }

  &.vertical {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

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