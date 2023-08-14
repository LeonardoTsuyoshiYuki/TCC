import React, { useState } from "react";
import { FaBars } from "react-icons/fa"
import SideBar from "../SideBar";

import * as C from "./styles";

function Header() {
    const [sideBar, setSideBar] = useState(false);

    function handleClickSideBar() {
        setSideBar(!sideBar)
    }

    return (
        <C.Container>
            <FaBars onClick={handleClickSideBar} />
            {sideBar && <SideBar active={setSideBar} />}
        </C.Container>
    );
}

export default Header