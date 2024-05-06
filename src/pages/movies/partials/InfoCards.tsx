import styled from "styled-components"
import colors from "../../../variables/colors"
import { MovieI } from "../MovieI"

function InfoCards({ movieInfo }: { movieInfo: MovieI | undefined }) {
    const budgetWithLetter = (budget: number) => {
        switch (true) {
            case budget > 1000000000:
                return (budget / 1000000000).toFixed(0) + 'B';
            case budget > 1000000:
                return (budget / 1000000).toFixed(0) + 'M';
            case budget > 1000:
                return (budget / 1000).toFixed(0) + 'K';
            default:
                return budget;
        }
    }

    const dateToUsFormat = (date: string) => {
        const dateObj = new Date(date);
        const month = dateObj.toLocaleString('en-US', { month: 'long' });
        const day = dateObj.getDate();
        const year = dateObj.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    const infos = [
        { title: 'Length', value: movieInfo?.runtime ? movieInfo?.runtime + "min" : 'N/A'},
        { title: 'Rating', value: movieInfo?.vote_average ? movieInfo?.vote_average?.toFixed(2) : 'N/A'},
        { title: 'Release', value: movieInfo?.release_date ? dateToUsFormat(movieInfo.release_date) : 'N/A'},
        { title: 'Budget', value: movieInfo?.budget ? "$" + budgetWithLetter(movieInfo.budget) : 'N/A' },
        { title: 'Revenue', value: movieInfo?.revenue ? "$" + budgetWithLetter(movieInfo.revenue) : 'N/A' },
    ]

    return (
        <InfoCardsStyled>
            {infos.map((info, index) => (
                <li key={index}>
                    <div>
                        <span className='left'>{info.title}</span>
                        <span className='right'>
                            {info.value}
                            {info.title === 'Rating' && movieInfo?.vote_count !== 0 && '/10'}    
                            {info.title === 'Rating' && movieInfo?.vote_count !== 0 && (
                                <span style={{ fontSize: '1rem', color: colors.lightwhite, opacity: .4 , display: "block", marginTop: "-20px"}}>
                                    <br />{movieInfo?.vote_count} votes
                                </span>
                            )}      
                            
                        </span>
                    </div>
                </li>
            ))}
        </InfoCardsStyled>
    )
}

export default InfoCards

const InfoCardsStyled = styled.ul`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;

    @media (max-width: 1300px) {
        // grid-template-columns: repeat(3, 1fr);
        overflow-x: auto;
    }

    li {
        list-style: none;
        padding: 0;
        min-width: 220px;

        > div {
            padding: 10px;
            background: rgba(255, 255, 255, .2);
            border-radius: 14px;
            min-height: 100px;

            display: grid;
            grid-template-columns: 1fr 8fr 1fr;
            align-items: center;
            gap: 24px;

            span.left {
                writing-mode: vertical-rl;
                scale: -1;
                text-transform: uppercase;
                font-family: "Radio Canada Big", sans-serif;
                font-weight: 700;
                text-spacing: 2px;
                color: ${colors.lightwhite};
                opacity: .4;
            }

            span.right {
                text-align: center;
                font-size: 2rem;
                font-family: "Radio Canada Big", sans-serif;
            }
        }
    }
`