import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";
import * as C from "./styles";
import Header from "../../components/Header";

function Home() {
    const { signout } = useAuth();
    const navigate = useNavigate();

    const handleSignout = () => {
        signout();
        navigate("/");
    };

    return (
        <>
            <Header />
            <C.Container>
                <C.StyledContainer>
                    <C.Title>Home</C.Title>
                    <Button Text="Sair" onClick={handleSignout}>
                        Sair
                    </Button>
                </C.StyledContainer>
            </C.Container>
        </>
    );
}

export default Home;
