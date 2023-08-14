import React from "react";
import * as C from "./styles"
import {
    FaTimes,
    FaHome,
    FaEnvelope,
    // FaRegSun,
    // FaUserAlt,
    // FaIdCardAlt,
    // FaRegFileAlt,
    // FaRegCalendarAlt,
    // FaChartBar
} from "react-icons/fa"

import SideBarItem from "../SideBarItem"


    function SideBar({active}){
        function closeSideBar (){
          active(false)
        }
    
    return(
        <C.Container sidebar={active}>
            <FaTimes onClick={closeSideBar} />
            <C.Content>
                <SideBarItem Icon={FaHome} Text="Inicio" />
                <SideBarItem Icon={FaEnvelope} Text="Statistcs" />
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