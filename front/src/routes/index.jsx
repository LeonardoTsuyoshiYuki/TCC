import { Fragment } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"
import useAuth from "../hooks/useAuth"
import Colaborador from "../pages/Colaborador"
import Funcao from "../pages/Funcao"
import Produtos from "../pages/Produtos"
import Relatorio from "../pages/Relatorio"
import ListaEPI from "../pages/Relatorio/ListagemDeEPIs"

function Private({ Item }) {
    const { signed } = useAuth();

    return signed > 0 ? <Item/> : <SignIn />
}

function RoutesApp(){
    return(
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route exact path="/home" element={<Private Item={Home}/>} />
                    <Route path="/" element={<SignIn />} />
                    <Route exact path="/signup" element={<SignUp />} />
                    <Route path="*" element={<SignIn />} />
                    <Route exact path="/colaborador" element={<Private Item={Colaborador}/>} />
                    <Route path="/" element={<SignIn />} />
                    <Route exact path="/funcao" element={<Private Item={Funcao}/>} />
                    <Route path="/" element={<SignIn />} />
                    <Route exact path="/produtos" element={<Private Item={Produtos}/>} />
                    <Route path="/" element={<SignIn />} />
                    <Route exact path="/relatorio" element={<Private Item={Relatorio}/>} />
                    <Route path="/" element={<SignIn />} />
                    <Route exact path="/listaepi" element={<Private Item={ListaEPI}/>} />
                    <Route path="/" element={<SignIn />} />
                </Routes>
            </Fragment>
        </BrowserRouter>
    )
}

export default RoutesApp;