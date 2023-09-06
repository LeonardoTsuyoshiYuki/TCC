import React, { useEffect, useState } from "react";
import { FaTrash, FaSearch, FaEdit  } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { Table, Button, Modal, Form  } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import api from "../../../services/services";

function ListaFuncao(props) {
  const { funcoes, searchValue, setFuncoes } = props
  const [filteredFuncoes, setFilteredFuncoes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFunction, setSelectedFunction] = useState({
    _id: "",
    nome: "",
    tipo: "",
  });

  useEffect(() => {
    filterFuncoes();
  }, [funcoes, searchValue]);

  const filterFuncoes = () => {
    if (searchValue === "") {
      setFilteredFuncoes(funcoes);
    } else {
      const filtered = funcoes.filter(funcaoItem =>
        funcaoItem.nome.toLowerCase().includes(searchValue.toLowerCase()) ||
        funcaoItem.tipo.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredFuncoes(filtered);
    }
  };

  const handleDeleteFuncao = async (id) => {
    try {
      await api.delete(`/funcao/${id}`);
      toast.success("Função excluída com sucesso.");
      fetchFuncoes();
    } catch (error) {
      toast.error("Erro ao excluir a Função.");
    }
  };

  const openModal = (funcaoItem) => {
    setSelectedFunction(funcaoItem);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedFunction({
      _id: "",
      nome: "",
      tipo: "",
    });
    setShowModal(false);
  };

  const fetchFuncoes = async () => {
    try {
      const retorno = await api.get('/funcao');
      setFuncoes(retorno.data.docs);
    } catch (error) {
      toast.error("Erro ao buscar as Funções.");
    }
  };

  const handleSaveChanges = async () => {
    try {
      const retorno = await api.put(`/funcao/${selectedFunction._id}`, {
        nome: selectedFunction.nome,
        tipo: selectedFunction.tipo
      });

      if (retorno.status === 200) {
        toast.success("Alterações salvas com sucesso.");
        fetchFuncoes();
        closeModal();
      } else {
        toast.error("Erro ao salvar as alterações.");
      }
    } catch (error) {
      console.error("Erro ao salvar as alterações:", error);
      toast.error("Erro ao salvar as alterações.");
    }
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Função</th>
            <th>Cargo</th>
            <th>Excluir</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {filteredFuncoes? filteredFuncoes.map((funcaoItem) => (
            <tr key={funcaoItem._id}>
              <td>{funcaoItem.nome}</td>
              <td>{funcaoItem.tipo}</td>
              <td align="center">
                <Button variant="danger" onClick={() => handleDeleteFuncao(funcaoItem._id)}>
                  <FaTrash />
                </Button>
              </td>
              <td align="center">
                <Button variant="secondary" onClick={() => openModal(funcaoItem)}>
                  <FaEdit  />
                </Button>
              </td>
            </tr>
          )): []}
        </tbody>
      </Table>
      <ToastContainer autoClose={2000} position={toast.POSITION.BOTTOM_LEFT} />
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Função</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome da Função"
                value={selectedFunction.nome}
                onChange={(e) =>
                  setSelectedFunction({
                    ...selectedFunction,
                    nome: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formTipo">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tipo da Função"
                value={selectedFunction.tipo}
                onChange={(e) =>
                  setSelectedFunction({
                    ...selectedFunction,
                    tipo: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Salvar Alterações
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default ListaFuncao;
