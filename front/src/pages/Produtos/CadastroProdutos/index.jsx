import React, { useState, useEffect } from "react";
import api from "../../../services/services";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from "react-toastify";
import { Container, Row, Form, Button, ListGroup } from "react-bootstrap";

function CadastroProdutos({ atualizarListagem }) {
    const [nome, setNome] = useState("");
    const [CAnumercao, setCAnumercao] = useState("");
    const [validadeCA, setValidadeCA] = useState("");
    const [fabricacao, setFabricacao] = useState("");
    const [produtos, setProdutos] = useState([]);

    async function fetchProdutos() {
        try {
            const response = await api.get("/produtos");
            setProdutos(response.data.docs);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    }

    async function handleCreateProduto() {
        try {
            const dados = {
                nome: nome,
                CAnumercao: CAnumercao,
                validadeCA: validadeCA,
                fabricacao: fabricacao
            };

            await api.post("/produto", dados);

            toast.success("Produto criado com sucesso.");
            atualizarListagem(); // Chama a função para atualizar a listagem
        } catch (error) {
            toast.error("Erro ao criar o Produto.");
        }
    }

    useEffect(() => {
        fetchProdutos(); // Busca os produtos quando o componente é montado
    }, []);

    return (
        <Container>
            <Row className="my-3">
                <Form.Control
                    type="text"
                    placeholder="Nome do Produto"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
            </Row>
            <Row className="my-3">
                <Form.Control
                    type="text"
                    placeholder="C.A (numeração)"
                    value={CAnumercao}
                    onChange={(e) => setCAnumercao(e.target.value)}
                />
            </Row>
            <Row className="my-3">
                <Form.Control
                    type="date"
                    placeholder="Validade C.A"
                    value={validadeCA}
                    onChange={(e) => setValidadeCA(e.target.value)}
                />
            </Row>
            <Row className="my-3">
                <Form.Control
                    type="date"
                    placeholder="Fabricação"
                    value={fabricacao}
                    onChange={(e) => setFabricacao(e.target.value)}
                />
            </Row>
            <Row className="my-3">
                <Button variant="primary" onClick={handleCreateProduto}>Criar Produto</Button>
            </Row>
            <Row className="my-3">
                <ToastContainer autoClose={2000} position={toast.POSITION.BOTTOM_LEFT} />
            </Row>
        </Container>
    );
}

export default CadastroProdutos;
