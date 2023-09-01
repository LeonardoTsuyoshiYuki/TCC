import React, { useState, useEffect } from "react";
import api from "../../../services/services";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from "react-toastify";
import { Container, Row, Form, Button } from "react-bootstrap";

function CadastroFuncao(props) {
    const { nome, setNome, tipo, setTipo, atualizarTabela } = props
   


    async function handleCreateFuncao() {
        try {
          const dados = {
            nome: nome,
            tipo: tipo
          };
    
          await api.post("/funcao", dados);
          atualizarTabela(true)
          setNome('')
          setTipo('')
          toast.success("Função criada com sucesso.");
        } catch (error) {
          toast.error("Erro ao criar a Função.");
        }
      }


    return (
        <Container>
            <Row className="my-3">
                <Form.Control 
                    type="text"
                    placeholder="Nome da Função"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
            </Row>
            <Row className="my-3">
                <Form.Control 
                    type="text"
                    placeholder="Tipo da Função"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                />
            </Row>
            <Row className="my-3">
                <Button variant="primary" onClick={handleCreateFuncao}>Criar Função</Button>
            </Row>
            <Row className="my-3">
                <ToastContainer autoClose={2000} position={toast.POSITION.BOTTOM_LEFT} />
            </Row>
       
        </Container>
    );
}

export default CadastroFuncao;
