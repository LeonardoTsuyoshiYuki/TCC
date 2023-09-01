import React from "react";
import * as C from "./styles";
import Header from "../../components/Header";

function Home() {

    return (
        <>
            <Header />
            <C.Container>
                <C.StyledContainer>
                    <C.Title>Home</C.Title>
                </C.StyledContainer>
            </C.Container>
        </>
    );
}

export default Home;
