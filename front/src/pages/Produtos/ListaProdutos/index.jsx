import React, { useState, useEffect } from "react";
import { FaTrash, FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { Table, Button, Modal, Form } from 'react-bootstrap';
import api from "../../../services/services";
import 'react-toastify/dist/ReactToastify.css';

function ListaProdutos(props) {
  const { produtos, searchValueProdutos, setProdutos } = props;
  
  const [filteredProdutos, setFilteredProdutos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState({
    _id: "",
    nome: "",
    CAnumercao: "",
    validadeCA: "",
    fabricacao: "",
  });

  useEffect(() => {
    filterProdutos();
  }, [produtos, searchValueProdutos]);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('pt-BR', options);
  };

  const filterProdutos = () => {
    const searchValue = searchValueProdutos.trim().toLowerCase();

    if (searchValue === "") {
      setFilteredProdutos(produtos);
    } else {
      const filtered = produtos.filter((produtoItem) => {
        const nome = produtoItem.nome.toLowerCase();
        const caNumero = produtoItem.CAnumercao.toLowerCase();
        const validadeCA = formatDate(produtoItem.validadeCA); // Formatar a data de validade
        const fabricacao = formatDate(produtoItem.fabricacao); // Formatar a data de fabricação

        return (
          nome.includes(searchValue) ||
          caNumero.includes(searchValue) ||
          validadeCA.includes(searchValue) ||
          fabricacao.includes(searchValue)
        );
      });

      setFilteredProdutos(filtered);
    }
  };

  const handleDeleteProduto = async (id) => {
    try {
      await api.delete(`/produtos/${id}`);
      toast.success("Produto excluída com sucesso.");
    } catch (error) {
      toast.error("Erro ao excluir a Produto.");
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await api.put(`/produto/${selectedProduto._id}`, {
        nome: selectedProduto.nome,
        CAnumercao: selectedProduto.CAnumercao,
        validadeCA: selectedProduto.validadeCA,
        fabricacao: selectedProduto.fabricacao,
      });
  
      if (response.status === 200) {
        toast.success("Alterações salvas com sucesso.");
        produtos(); 
        closeModal();
      } else {
        toast.error("Erro ao salvar as alterações.");
      }
    } catch (error) {
      console.error("Erro ao salvar as alterações:", error);
      toast.error("Erro ao salvar as alterações.");
    }
  };
  

  const openModal = (produtoItem) => {
    setSelectedProduto(produtoItem);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedProduto({
      _id: "",
      nome: "",
      CAnumercao: "",
      validadeCA: "",
      fabricacao: "",
    });
    setShowModal(false);
  }
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>C.A (numeração)</th>
            <th>Validade C.A</th>
            <th>Fabricação</th>
            <th>Ações</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos?.data?.docs.length > 0 ? 
            produtos.data.docs.map((produtoItem) => (
            <tr key={produtoItem._id}>
              <td>{produtoItem.nome}</td>
              <td>{produtoItem.CAnumercao}</td>
              <td>{produtoItem.validadeCA}</td>
              <td>{produtoItem.fabricacao}</td>
              <td align="center">
                <Button variant="danger" onClick={() => handleDeleteProduto(produtoItem._id)}>
                  <FaTrash />
                </Button>
              </td>
              <td align="center">
                <Button variant="secondary" onClick={() => openModal(produtoItem)}>
                  <FaSearch />
                </Button>
              </td>
            </tr>
          )): []}
        </tbody>
      </Table>
      <ToastContainer autoClose={2000} position={toast.POSITION.BOTTOM_LEFT} />
      <Modal show={showModal} onHide={closeModal}>  
        <Modal.Header closeButton>
          <Modal.Title>Editar Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome do Produto"
                value={selectedProduto.nome}
                onChange={(e) =>
                  setSelectedProduto({
                    ...selectedProduto,
                    nome: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formCAnumercao">
              <Form.Label>C.A (numeração)</Form.Label>
              <Form.Control
                type="text"
                placeholder="C.A (numeração) do Produto"
                value={selectedProduto.CAnumercao}
                onChange={(e) =>
                  setSelectedProduto({
                    ...selectedProduto,
                    CAnumercao: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formValidadeCA">
              <Form.Label>Validade C.A</Form.Label>
              <Form.Control
                type="date"
                value={selectedProduto.validadeCA}
                onChange={(e) =>
                  setSelectedProduto({
                    ...selectedProduto,
                    Fabricação: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formFabricacao">
              <Form.Label>Fabricação</Form.Label>
              <Form.Control
                type="date"
                value={selectedProduto.fabricacao}
                onChange={(e) =>
                  setSelectedProduto({
                    ...selectedProduto,
                    fabricacao: e.target.value,
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

export default ListaProdutos;
