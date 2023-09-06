import React, { useState } from "react";
import api from "../../../services/services";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import { Container, Row, Form, Button, Spinner } from "react-bootstrap";

function CadastroProdutos(props) {
  // Definir estados para os campos do formulário
  const [nome, setNome] = useState("");
  const [codigoCA, setCodigoCA] = useState("");
  const [validadeCA, setValidadeCA] = useState("");
  const [fabricacao, setFabricacao] = useState("");
  const [quantidade, setQuantidade] = useState("");

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crie um objeto com os dados do produto
    const novoProduto = {
      nome,
      codigoCA,
      validadeCA,
      fabricacao,
      quantidade,
    };

    // Envie os dados para sua API usando a função 'api' (substitua com sua implementação)
    try {
      await api.post("/produtos", novoProduto);

      // Se a operação for bem-sucedida, você pode exibir uma mensagem de sucesso
      toast.success("Produto cadastrado com sucesso!");

      // Limpe os campos do formulário após o envio bem-sucedido
      setNome("");
      setCodigoCA("");
      setValidadeCA("");
      setFabricacao("");
      setQuantidade("");
    } catch (error) {
      // Em caso de erro, você pode exibir uma mensagem de erro
      toast.error("Erro ao cadastrar o produto. Tente novamente.");
    }
  };

  return (
    <Container>
      <br/>
      <Row>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label style={{color: 'white' }}>Nome do Produto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome do Produto"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{color: 'white' }}>Código CA</Form.Label>
            <Form.Control
              type="number"
              placeholder="Código CA"
              value={codigoCA}
              onChange={(e) => setCodigoCA(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label  style={{color: 'white' }}>Validade CA</Form.Label>
            <Form.Control
              type="date"
              placeholder="Validade CA"
              value={validadeCA}
              onChange={(e) => setValidadeCA(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{color: 'white' }}>Data de Fabricação</Form.Label>
            <Form.Control
              type="date"
              placeholder="Data de Fabricação"
              value={fabricacao}
              onChange={(e) => setFabricacao(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{color: 'white' }}>Quantidade</Form.Label>
            <Form.Control
              type="number"
              placeholder="Quantidade"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              required
            />
          </Form.Group>
          <br/>
          <Button variant="primary" type="submit">
            Cadastrar
          </Button>
        </Form>
      </Row>
    </Container>
  );
}

export default CadastroProdutos;
