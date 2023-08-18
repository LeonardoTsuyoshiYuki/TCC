import GlobalStyle from "../../styles/global";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as C from "./styles"
import Header from "../../components/Header"
import ListaColaborador from "./ListaColaborador";


function Colaborador() {



  return (
    <>
      <Header>
      </Header>
      <C.Container>
        <C.Title>COLABORADORES</C.Title>
        <ListaColaborador />
      </C.Container>
      <ToastContainer autoClose={2000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default Colaborador;