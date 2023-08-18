import React, { useEffect, useState } from "react";
import api from "../../../services/services";
import * as C from "./styles";
import { FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

function ListaColaborador() {
  const [colaboradores, setColaboradores] = useState([]);

  useEffect(() => {
    buscadados();
  }, []);

  async function buscadados() {
    try {
      const response = await api.get('/colaboradores');
      setColaboradores(response.data.docs);
    } catch (error) {
      toast.error("Erro ao buscar colaboradores.");
    }
  }

  async function handleDeleteColaborador(id) {
    try {
      await api.delete(`/colaboradores/${id}`);
      toast.success("Colaborador excluído com sucesso.");
      buscadados(); // Atualiza a lista após exclusão
    } catch (error) {
      toast.error("Erro ao excluir colaborador.");
    }
  }

  return (
    <>
      <C.Table>
        <C.Thead>
          <C.Tr>
            <C.Th>Matrícula</C.Th>
            <C.Th>Nome</C.Th>
            <C.Th>Ações</C.Th>
          </C.Tr>
        </C.Thead>

        <C.Tbody>
          {colaboradores.map((colaborador) => (
            <C.Tr key={colaborador._id}>
              <C.Td>{colaborador.matricula}</C.Td>
              <C.Td>{colaborador.nome}</C.Td>
              <C.Td alignCenter>
                <C.ButtonIcon onClick={() => handleDeleteColaborador(colaborador._id)}>
                  <FaTrash />
                </C.ButtonIcon>
              </C.Td>
            </C.Tr>
          ))}
        </C.Tbody>
      </C.Table>
      <ToastContainer autoClose={2000} position={toast.POSITION.BOTTOM_LEFT} />
    </>
  );
}

export default ListaColaborador;
