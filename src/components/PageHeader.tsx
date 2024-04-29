import styled from "styled-components";

interface PageHeaderProps {
    title: string;
    description?: string;
    bgimage?: string;
    bgcolors?: string;
}

export default function PageHeader({ title, description = "", bgimage = "", bgcolors = "" }: PageHeaderProps) {
    return (
        <PageHeaderStyled bgimage={bgimage} bgcolors={bgcolors}>
            <h1>{title}</h1>
            {description && <p>{description}</p>}
        </PageHeaderStyled>
    );
}

const PageHeaderStyled = styled.div<{ bgimage?: string; bgcolors?: string }>`
    background-color: ${(props) => props.bgcolors || "#000"};
    background-image: url("${(props) => props.bgimage || ""}");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    height: 250px;
    width: 100%;
    color: #fff;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(51,51,51,0.5); 
    }

    * {
        z-index: 1;
    }
`;
