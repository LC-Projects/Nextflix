import Header from "./header/Header";
import Footer from "./Footer";
import styled from "styled-components";
import PageHeader from "../../components/PageHeader";
import { PropsWithChildren } from "react";

interface PageLayoutProps {
    title: string;
    description?: string;
    bgimage?: string;
    bgcolors?: string;
}

export default function PageLayout({ title, description = "", bgimage = "", bgcolors = "", children }: PropsWithChildren<PageLayoutProps>) {

    
    return (
        <PageLayoutStyled>
            <PageHeader title={title} description={description} bgcolors={bgcolors} bgimage={bgimage} />
            {children}
        </PageLayoutStyled>
    )
}


const PageLayoutStyled = styled.div`
    padding: 0;

    >* {
        padding: 0 75px;
    }
`;