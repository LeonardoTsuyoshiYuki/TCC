import React from "react";
import * as C from "./styles"

function SideBarItem({ Icon, Text }){
    return (
        <C.Container>
            <Icon />
            { Text }
        </C.Container>
    )
}

export default SideBarItem