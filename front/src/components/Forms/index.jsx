import React, { useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";3
import * as C from "./styles";

const Form = ({ getUsers, onEdit, setOnEdit }) => {
    const ref = useRef();
  
    useEffect(() => {
      if (onEdit) {
        const user = ref.current;
  
        user.nome.value = onEdit.nome;
        user.email.value = onEdit.email;
        user.fone.value = onEdit.fone;
        user.data_nascimento.value = onEdit.data_nascimento;
      }
    }, [onEdit]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const user = ref.current;
  
      if (
        !user.nome.value ||
        !user.email.value ||
        !user.fone.value ||
        !user.data_nascimento.value
      ) {
        return toast.warn("Preencha todos os campos!");
      }
  
      if (onEdit) {
        await axios
          .put("http://localhost:3000/" + onEdit.id, {
            nome: user.nome.value,
            email: user.email.value,
            fone: user.fone.value,
            data_nascimento: user.data_nascimento.value,
          })
          .then(({ data }) => toast.success(data))
          .catch(({ data }) => toast.error(data));
      } else {
        await axios
          .post("http://localhost:3000", {
            nome: user.nome.value,
            email: user.email.value,
            fone: user.fone.value,
            data_nascimento: user.data_nascimento.value,
          })
          .then(({ data }) => toast.success(data))
          .catch(({ data }) => toast.error(data));
      }
  
      user.nome.value = "";
      user.email.value = "";
      user.fone.value = "";
      user.data_nascimento.value = "";
  
      setOnEdit(null);
      getUsers();
    };
  
    return (
      <C.FormContainer ref={ref} onSubmit={handleSubmit}>
        <C.InputArea>
          <C.Label>Nome</C.Label>
          <Input name="nome" />
        </C.InputArea>
        <C.InputArea>
          <C.Label>E-mail</C.Label>
          <Input name="email" type="email" />
        </C.InputArea>
        <C.InputArea>
          <C.Label>Telefone</C.Label>
          <Input name="fone" />
        </C.InputArea>
        <C.InputArea>
          <C.Label>Data de Nascimento</C.Label>
          <Input name="data_nascimento" type="date" />
        </C.InputArea>
  
        <C.Button type="submit">SALVAR</C.Button>
      </C.FormContainer>
    );
  };
  
  export default Form;