import React, { useEffect, useRef } from "react";
import api from "../../services/services";
import { toast } from "react-toastify"; 
import * as C from "./styles";

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.nome;
      user.matricula.value = onEdit.matricula;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome.value ||
      !user.matricula.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await api
        .put("http://localhost:3000/" + onEdit.id, {
          nome: user.nome.value,
          matricula: user.matricula.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await api
        .post("http://localhost:3000", {
          nome: user.nome.value,
          matricula: user.matricula.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.nome.value = "";
    user.matricula.value = "";
  

    setOnEdit(null);
    getUsers();
  };

  return (
    <C.FormContainer ref={ref} onSubmit={handleSubmit}>
      <C.InputArea>
        <C.Label>Nome</C.Label>
        <C.Input name="nome" />
      </C.InputArea>
      <C.InputArea>
        <C.Label>Matricula</C.Label>
        <C.Input name="matricula" type="matricula" />
      </C.InputArea>
      <C.Button type="submit">SALVAR</C.Button>
    </C.FormContainer>
  );
};

export default Form;