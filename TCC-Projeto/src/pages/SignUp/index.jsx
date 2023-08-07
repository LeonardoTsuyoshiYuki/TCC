import React, { useState } from "react";
import Input from "../../components/Input"
import Button from "../../components/Button"
import * as C from "./styles"
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const SignUp = () => {
    
    const [matricula, setMatricula] = useState("")
    const [senha, setSenha] = useState("")
    const [senhaConf, setSenhaConf] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    
    const {signup} = useAuth()
    
    function handleClickCadastro(){
        if(!matricula  | !senha | !senhaConf){
            setError("Preencha Todos os campos")
            return
        }else if(senha !== senhaConf){
            setError("As Senha nao sao iguais!")
            return
        }
        const res = signup(matricula, senha)

        if(res){
            setError(res)
            return
        }

        alert("Usuario cadastrado com sucesso!")
        navigate("/")
    } 
    return ( 
        <C.Container>
            <C.Label>oi</C.Label>
            <C.Content>
                <Input
                    type="Matricula"
                    placeholder="Digite sua Matricula"
                    value={matricula}
                    onChange={(e) => [setMatricula(e.target.value), setError("")]}
                />
                <Input 
                    type="Password"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => [setSenha(e.target.value), setError("")]}
                />
                <Input 
                    type="Password"
                    placeholder="Confirme sua senha"
                    value={senhaConf}
                    onChange={(e) => [setSenhaConf(e.target.value), setError("")]}
                />
                <C.labelError>{ error }</C.labelError>
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