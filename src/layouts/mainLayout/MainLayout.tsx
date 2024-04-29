import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./Footer";
import styled from "styled-components";

export default function MainLayout() {

    
    return (
        <MainLayoutStyled>
            <Header />
            <Outlet />
            <Footer />
        </MainLayoutStyled>
    )
}


const MainLayoutStyled = styled.div`
    >* {
        padding: 0 75px;
    }
`;