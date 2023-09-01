import React from "react";
import * as C from "./styles";
import useAuth from "../../hooks/useAuth";
import { IoBuildOutline, IoArrowUndoOutline, IoHomeOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { FaTimes, FaBox } from "react-icons/fa"; // Adicionado o ícone FaBox

import { useNavigate } from "react-router-dom";

function SideBar({ active, Text }) {
    const { signout } = useAuth()
    const navigate = useNavigate()

    function handleClickColaborador() {
        navigate("/colaborador")
    }

    function handleClickFuncao() {
        navigate("/funcao")
    }

    function handleClickProdutos() {
        navigate("/produtos") 
    }

    function closeSideBar() {
        active(false)
    }

    return (
        <C.Container sidebar={active}>
            <FaTimes onClick={closeSideBar} />
            <C.Content>                     
                <C.ContainerIcon onClick={() => navigate("/home")}>
                    <IoHomeOutline />
                    Home
                </C.ContainerIcon>

                <C.ContainerIcon onClick={handleClickColaborador}>
                    <CiUser />
                    Colaborador
                </C.ContainerIcon>

                <C.ContainerIcon onClick={handleClickFuncao}>
                    <IoBuildOutline />
                    Função
                </C.ContainerIcon>

                <C.ContainerIcon onClick={handleClickProdutos}>
                    <FaBox />
                    Produtos
                </C.ContainerIcon>

                <C.ContainerIcon 
                    onClick={() => [
                        signout(),
                        navigate("/")
                    ]}>
                    <IoArrowUndoOutline />
                    Sair
                </C.ContainerIcon>
            </C.Content>
        </C.Container>
    )
}

export default SideBar;
