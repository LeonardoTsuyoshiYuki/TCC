import React from "react";
import Globalstyle from "./styles/global";
import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/auth";

const App = () => {
    return ( 
        <AuthProvider>
            <RoutesApp />
            <Globalstyle/>
        </AuthProvider>
    )
}

export default App