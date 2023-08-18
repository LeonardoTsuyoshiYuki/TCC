import React, { useState } from "react";
import Input from "../../components/Input"
import Button from "../../components/Button"
import * as C from "./styles"
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import api from '../../services/services'


function SignUp() {

    const [nome, setNome] = useState("")
    const [matricula, setMatricula] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConf, setPasswordConf] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const { signup } = useAuth()

    async function handleClickCadastro() {

        if (!matricula | !nome | !password | !passwordConf) {
            setError("Preencha Todos os campos")
            return
        }
        if (nome === '') {
            setError("Nome é obrigatorio!")
            return
        }
        if (matricula === '') {
            setError("Matricula é obrigatorio!")
            return
        }
        if (password !== passwordConf) {
            setError("As password nao sao iguais!")
            return
        }

        try {
            const docs = {
                nome,
                matricula,
                password

            }
            await api.post(`/colaboradores`, docs)
            const res = signup(matricula, password)

            if(res){
                setError(res)
                return
            }
            alert("Usuario cadastrado com sucesso!")

            navigate("/")
        } catch (error) {
            alert("Erro ao cadastrado Usuario!")
        }

    }
    return (
        <C.Container>
            <C.Label>Cadastro Colaborador</C.Label>
            <C.Content>
                <Input
                    type="Nome"
                    placeholder="Digite seu Nome"
                    value={nome}
                    onChange={(e) => [setNome(e.target.value), setError("")]}
                />
                <Input
                    type="Matricula"
                    placeholder="Digite sua Matricula"
                    value={matricula}
                    onChange={(e) => [setMatricula(e.target.value), setError("")]}
                />
                <Input
                    type="Password"
                    placeholder="Digite sua Senha"
                    value={password}
                    onChange={(e) => [setPassword(e.target.value), setError("")]}
                />
                <Input
                    type="Password"
                    placeholder="Confirme sua password"
                    value={passwordConf}
                    onChange={(e) => [setPasswordConf(e.target.value), setError("")]}
                />
                <C.labelError>{error}</C.labelError>
                <Button Text="Inscrever-se" onClick={handleClickCadastro} />
                <C.LabelSignin>
                    ja tem um conta?
                    <C.Strong>
                        <Link to="/">&nbsp;Entre</Link>
                    </C.Strong>
                </C.LabelSignin>
            </C.Content>
        </C.Container>
    )
}

export default SignUp