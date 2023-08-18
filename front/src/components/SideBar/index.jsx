import React from "react";
import * as C from "./styles"
import useAuth from "../../hooks/useAuth";

import {
    FaTimes,
    FaHome,
    // FaEnvelope,
    FaTrashAlt,
    // FaRegSun,
    FaUserAlt,
    // FaIdCardAlt,
    // FaRegFileAlt,
    // FaRegCalendarAlt,
    // FaChartBar
} from "react-icons/fa"

import { useNavigate } from "react-router-dom";



function SideBar({ active, Text }) {
    const { signout } = useAuth()
    const navigate = useNavigate()

    function handleClickColaborador() {
        navigate("/colaborador")
    }
    function closeSideBar() {
        active(false)
    }


    return (
        <C.Container sidebar={active}>
            <FaTimes onClick={closeSideBar} />
            <C.Content>
                

                <C.ContainerIcon
                onClick={()=>{
                    navigate("/home")
                }}>
                    <FaHome />
                    LISTAGEM
                </C.ContainerIcon>

                <C.ContainerIcon  onClick={handleClickColaborador} >
                    <FaUserAlt />
                    COLABORADORES
                </C.ContainerIcon>

                <C.ContainerIcon 
                    onClick={() => [
                        signout(),
                        navigate("/")
                    ]}>
                    <FaTrashAlt />
                    SAIR
                </C.ContainerIcon>

                {/* <SideBarItem Icon={FaRegSun} Text="" />
                <SideBarItem Icon={FaUserAlt} Text="" />
                <SideBarItem Icon={FaIdCardAlt} Text="" />
                <SideBarItem Icon={FaRegFileAlt} Text="" />
                <SideBarItem Icon={FaRegCalendarAlt} Text="" />
                <SideBarItem Icon={FaChartBar} Text="" /> */}
            </C.Content>
        </C.Container>
    )
}

export default SideBar