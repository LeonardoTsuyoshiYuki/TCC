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
    const [error, setError] = useState("");
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
        // Validation logic here
        // ...

        try {
            await api.post(`/colaboradores`, user);

            const res = signup(user.matricula, user.password);
            if (res) {
                setError(res);
                return;
            }

            alert("Usuário cadastrado com sucesso!");
            navigate("/");
        } catch (error) {
            alert("Erro ao cadastrar usuário!");
        }
    }

    const handleChange = (field, value) => {
        if (field.startsWith('endereco.')) {
            // If the field is part of the endereco object
            setUser((prevUser) => ({
                ...prevUser,
                endereco: {
                    ...prevUser.endereco,
                    [field.split('.')[1]]: value, // Update the nested field (cidade or estado)
                },
            }));
        } else {
            // If the field is a direct property of user
            setUser((prevUser) => ({
                ...prevUser,
                [field]: value,
            }));
        }
        setError(""); // Clear error when input changes
    };

    return (
        <Container>
            <Card>
                <Card.Header> <h1 style={{ textAlign: 'center' }}>Cadastro Colaborador</h1></Card.Header>
                <Card.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group controlId="nome">
                                    <Form.Label style={{ textAlign: 'center' }}>Nome</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Digite seu Nome"
                                        value={user.nome}
                                        onChange={(e) => handleChange("nome", e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="matricula">
                                    <Form.Label style={{ textAlign: 'center' }}>Matrícula</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Digite sua Matricula"
                                        value={user.matricula}
                                        onChange={(e) => handleChange("matricula", e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <Form.Group controlId="email">
                                    <Form.Label style={{ textAlign: 'center' }}>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Digite seu Email"
                                        value={user.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="cargo">
                                    <Form.Label style={{ textAlign: 'center' }}>Cargo</Form.Label>
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
                                </Form.Group>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <Form.Group controlId="telefone">
                                    <Form.Label style={{ textAlign: 'center' }}>Telefone</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Digite seu Telefone"
                                        value={user.telefone}
                                        onChange={(e) => handleChange("telefone", e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="cpf">
                                    <Form.Label style={{ textAlign: 'center' }}>CPF</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Digite seu CPF"
                                        value={user.cpf}
                                        onChange={(e) => handleChange("cpf", e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <Form.Group controlId="cidade">
                                    <Form.Label style={{ textAlign: 'center' }}>Cidade</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Digite a cidade"
                                        value={user.endereco.cidade}
                                        onChange={(e) => handleChange("endereco.cidade", e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="estado">
                                    <Form.Label style={{ textAlign: 'center' }}>Estado</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Digite o estado"
                                        value={user.endereco.estado}
                                        onChange={(e) => handleChange("endereco.estado", e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="polo">
                                    <Form.Label style={{ textAlign: 'center' }}>Polo</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Digite o polo"
                                        value={user.endereco.polo}
                                        onChange={(e) => handleChange("endereco.polo", e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <br />

                        <Row>
                            <Col>
                                <Form.Group controlId="password">
                                    <Form.Label style={{ textAlign: 'center' }}>Senha</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Digite sua Senha"
                                        value={user.password}
                                        onChange={(e) => handleChange("password", e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            
                            <Col>
                                <Form.Group controlId="passwordConf">
                                    <Form.Label style={{ textAlign: 'center' }}>Confirme sua Senha</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirme sua senha"
                                        value={user.passwordConf}
                                        onChange={(e) => handleChange("passwordConf", e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
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
