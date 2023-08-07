import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const SignIn = () => {
    const { signin } = useAuth()
    const navigate = useNavigate()

    const [matricula, setMatricula] = useState("")
    const [senha, setSenha] = useState("")
    const [error, setError] = useState("")

    function handleClickLogin () {
        if (!matricula || !senha) {
            setError("Preencha todos os campos")
            return
        }
        
        const res = signin(matricula, senha)
        
        if (res) {
            setError(res)
            return
        }
        navigate("/home")
    }

    return (
        <C.Container>
            <C.Label>SISTEMA DE LOGIN</C.Label>
            <C.Content>
                <Input
                    type="matricula"
                    placeholder="Digite sua Matricula"
                    value={matricula}
                    onChange={(e) => [setMatricula(e.target.value), setError("")]}
                />
                <Input
                    type="password"
                    placeholder="Digite sua Senha"
                    value={senha}
                    onChange={(e) => [setSenha(e.target.value), setError("")]}
                />
                <C.LabelError>{error}</C.LabelError>
                <Button Text="Entrar" onClick={handleClickLogin} />
                <C.LabelSignUp>
                    Não tem uma conta?
                    <C.Strong>
                        <Link to="/signup">&nbsp;Registre-se</Link>
                    </C.Strong>
                </C.LabelSignUp>
            </C.Content>
        </C.Container>
    );
};

export default SignIn