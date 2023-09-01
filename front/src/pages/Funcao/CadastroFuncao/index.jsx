import React, { useState, useEffect } from "react";
import api from "../../../services/services";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from "react-toastify";
import { Container, Row, Form, Button, ListGroup } from "react-bootstrap";

function CadastroFuncao({ atualizarListagem }) {
    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState("");
    const [funcoes, setFuncoes] = useState([]);

    async function fetchFuncoes() {
        try {
            const response = await api.get("/funcoes");
            setFuncoes(response.data);
        } catch (error) {
            console.error("Erro ao buscar funções:", error);
        }
    }

    async function handleCreateFuncao() {
        try {
          const dados = {
            nome: nome,
            tipo: tipo
          };
    
          await api.post("/funcao", dados);
    
          toast.success("Função criada com sucesso.");
          atualizarListagem(); // Chama a função para atualizar a listagem
        } catch (error) {
          toast.error("Erro ao criar a Função.");
        }
      }

    useEffect(() => {
        fetchFuncoes(); // Busca as funções quando o componente é montado
    }, []);

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
