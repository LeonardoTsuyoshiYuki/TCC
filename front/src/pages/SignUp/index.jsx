import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import api from '../../services/services';

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
            estado: ""
        },
        polo: ""
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { signup } = useAuth();

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
        setUser(prevUser => ({
            ...prevUser,
            [field]: value
        }));
        setError(""); // Clear error when input changes
    };

    return (
        <C.Container>
            <C.Label>Cadastro Colaborador</C.Label>
            <C.Content>
                <Input
                    type="text"
                    placeholder="Digite seu Nome"
                    value={user.nome}
                    onChange={(e) => handleChange("nome", e.target.value)}
                />
                <Input
                    type="number"
                    placeholder="Digite sua Matricula"
                    value={user.matricula}
                    onChange={(e) => handleChange("matricula", e.target.value)}
                />
                <Input
                    type="email"
                    placeholder="Digite seu Email"
                    value={user.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Digite seu Cargo"
                    value={user.cargo}
                    onChange={(e) => handleChange("cargo", e.target.value)}
                />
                <Input
                    type="number"
                    placeholder="Digite seu Telefone"
                    value={user.telefone}
                    onChange={(e) => handleChange("telefone", e.target.value)}
                />
                <Input
                    type="number"
                    placeholder="Digite seu CPF"
                    value={user.cpf}
                    onChange={(e) => handleChange("cpf", e.target.value)}
                />
               
                <Input
                    type="text"
                    placeholder="Digite a cidade"
                    value={user.endereco.cidade}
                    onChange={(e) => handleChange("endereco.cidade", e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Digite o estado"
                    value={user.endereco.estado}
                    onChange={(e) => handleChange("endereco.estado", e.target.value)}
                />
                <Input
                    type="number"
                    placeholder="Digite o polo"
                    value={user.polo}
                    onChange={(e) => handleChange("polo", e.target.value)}
                />
                 <Input
                    type="password"
                    placeholder="Digite sua Senha"
                    value={user.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Confirme sua senha"
                    value={user.passwordConf}
                    onChange={(e) => handleChange("passwordConf", e.target.value)}
                />
                <C.labelError>{error}</C.labelError>
                <Button Text="Inscrever-se" onClick={handleClickCadastro} />
                <C.LabelSignin>
                    Já tem uma conta?
                    <C.Strong>
                        <Link to="/">&nbsp;Entre</Link>
                    </C.Strong>
                </C.LabelSignin>
            </C.Content>
        </C.Container>
    );
}

export default SignUp;
