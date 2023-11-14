import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import api from "../../services/services";
import Card from 'react-bootstrap/Card';

function SignUp() {
  const [user, setUser] = useState({
    nome: "",
    matricula: "",
    email: "",
    cargo: "",
    telefone: "",
    cpf: "",
    password: "",
    passwordConf: "",
    ativo: true,
    endereco: {
      cidade: "",
      estado: "",
      polo: "",
    },
  });

  const [cargos, setCargos] = useState([]);
  const navigate = useNavigate();
  const { signup } = useAuth();

  useEffect(() => {
    BuscaFuncao();
  }, []);

  async function BuscaFuncao() {
    try {
      const response = await api.get("/funcao");
      setCargos(response.data.docs);
    } catch (error) {
      console.error("Erro ao buscar cargos:", error);
    }
  }

  async function handleClickCadastro() {
    try {
      await api.post(`/colaboradores`, user);

      signup(user.matricula, user.password);

      alert("Usuário cadastrado com sucesso!");
      navigate("/");
    } catch (error) {
      alert("Erro ao cadastrar usuário!");
    }
  }

  const handleChange = (field, value) => {
    if (field.startsWith("endereco.")) {
      field = field.split(".")[1];
      setUser((prevUser) => ({
        ...prevUser,
        endereco: {
          ...prevUser.endereco,
          [field]: value,
        },
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [field]: value,
      }));
    }
  };

  return (
    <Container>
      <Card>
        <Card.Header> <h1 style={{ textAlign: 'center' }}>Cadastro Colaborador</h1></Card.Header>
        <Card.Body>
          <Form>
            <Row>
              {[
                { controlId: "nome", label: "Nome", type: "text" },
                { controlId: "matricula", label: "Matrícula", type: "text" },
              ].map((input) => (
                <Col key={input.controlId}>
                  <Form.Group controlId={input.controlId}>
                    <Form.Label style={{ textAlign: 'center' }}>{input.label}</Form.Label>
                    <Form.Control
                      type={input.type}
                      placeholder={`Digite seu ${input.label}`}
                      value={user[input.controlId]}
                      onChange={(e) => handleChange(input.controlId, e.target.value)}
                    />
                  </Form.Group>
                </Col>
              ))}
            </Row>
            <br />
            <Row>
              {[
                { controlId: "email", label: "Email", type: "email" },
                { controlId: "cargo", label: "Cargo", type: "select" },
              ].map((input) => (
                <Col key={input.controlId}>
                  <Form.Group controlId={input.controlId}>
                    <Form.Label style={{ textAlign: 'center' }}>{input.label}</Form.Label>
                    {input.type === "select" ? (
                      <Form.Select
                        value={user.cargo}
                        onChange={(e) => handleChange("cargo", e.target.value)}
                      >
                        <option value="">Selecione um cargo</option>
                        {cargos.map((cargo) => (
                          <option key={cargo._id} value={cargo._id}>
                            {cargo.nome}
                          </option>
                        ))}
                      </Form.Select>
                    ) : (
                      <Form.Control
                        type={input.type}
                        placeholder={`Digite seu ${input.label}`}
                        value={user[input.controlId]}
                        onChange={(e) => handleChange(input.controlId, e.target.value)}
                      />
                    )}
                  </Form.Group>
                </Col>
              ))}
            </Row>
            <br />
            <Row>
              {[
                { controlId: "telefone", label: "Telefone", type: "text" },
                { controlId: "cpf", label: "CPF", type: "text" },
              ].map((input) => (
                <Col key={input.controlId}>
                  <Form.Group controlId={input.controlId}>
                    <Form.Label style={{ textAlign: 'center' }}>{input.label}</Form.Label>
                    <Form.Control
                      type={input.type}
                      placeholder={`Digite seu ${input.label}`}
                      value={user[input.controlId]}
                      onChange={(e) => handleChange(input.controlId, e.target.value)}
                    />
                  </Form.Group>
                </Col>
              ))}
            </Row>
            <br />
            <Row>
              {[
                { controlId: "endereco.cidade", label: "Cidade", type: "text" },
                { controlId: "endereco.estado", label: "Estado", type: "text" },
                { controlId: "endereco.polo", label: "Polo", type: "text" },
              ].map((input) => (
                <Col key={input.controlId}>
                  <Form.Group controlId={input.controlId}>
                    <Form.Label style={{ textAlign: 'center' }}>{input.label}</Form.Label>
                    <Form.Control
                      type={input.type}
                      placeholder={`Digite a ${input.label}`}
                      value={user[input.controlId]}
                      onChange={(e) => handleChange(input.controlId, e.target.value)}
                    />
                  </Form.Group>
                </Col>
              ))}
            </Row>
            <br />
            <Row>
              {[
                { controlId: "password", label: "Senha", type: "password" },
                { controlId: "passwordConf", label: "Confirme sua Senha", type: "password" },
              ].map((input) => (
                <Col key={input.controlId}>
                  <Form.Group controlId={input.controlId}>
                    <Form.Label style={{ textAlign: 'center' }}>{input.label}</Form.Label>
                    <Form.Control
                      type={input.type}
                      placeholder={`Digite sua ${input.label}`}
                      value={user[input.controlId]}
                      onChange={(e) => handleChange(input.controlId, e.target.value)}
                    />
                  </Form.Group>
                </Col>
              ))}
            </Row>
          </Form>
        </Card.Body>
        <br />
        <Card.Footer className="text-center">
          <Button style={{ alignItems: 'center', color: 'white' }} variant="primary" onClick={handleClickCadastro}>
            Inscrever-se
          </Button>
          <p>
            Já tem uma conta? <Link to="/">Entre</Link>
          </p>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default SignUp;
