import styled from "styled-components"
import { MovieI } from "../MovieI"
import colors from "../../../variables/colors"

function TagList({
    movieInfo
}: {
    movieInfo: MovieI | undefined
}) {
    return (
        <TagListStyled>
            {movieInfo?.genres?.map((genre, index) => (
                <li key={index}>
                    <span className='tag'>{genre.name}</span>
                </li>
            ))}
        </TagListStyled>
    )
}

export default TagList

const TagListStyled = styled.ul`
    .tag {
        background-color: rgba(255, 255, 255, 0.2);
        color: ${colors.lightwhite};
        padding: 5px 10px;
        border: 1px solid ${colors.lightwhite};
        border-radius: 8px;
        display: inline-block;
    }

    list-style: none;
    padding: 0;
    margin: 8px 0 0 0;

    li {
        display: inline-block;
        margin-right: 10px;
    
        &:last-child {
            margin-right: 0;
        
        }
    }
`