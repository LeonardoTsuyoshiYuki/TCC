import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { FaTrash, FaEdit  } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../services/services';

function ListaProdutos(props) {
  const { produtos, searchValueProdutos } = props;

  const [filteredProdutos, setFilteredProdutos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState({
    _id: '',
    nome: '',
    codigoCA: '',
    validadeCA: '',
    fabricacao: '',
    quantidade: '',
  });

  useEffect(() => {
    filterProdutos();

  }, [produtos, searchValueProdutos]);

  function formatDate(date) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString('pt-BR', options);
  }

  function filterProdutos() {
    const searchValue = searchValueProdutos.trim().toLowerCase();

    if (searchValue === '') {
      setFilteredProdutos(produtos || []);
    } else {
      const filtered = (produtos || []).filter((produtoItem) => {
        const { nome, codigoCA, validadeCA, fabricacao, quantidade } = produtoItem;
        const formattedValidadeCA = formatDate(validadeCA);
        const formattedFabricacao = formatDate(fabricacao);

        return (
          nome.toLowerCase().includes(searchValue) ||
          codigoCA.toLowerCase().includes(searchValue) ||
          formattedValidadeCA.includes(searchValue) ||
          formattedFabricacao.includes(searchValue)||
          quantidade.toLowerCase().includes(searchValue) 
        );
      });

      setFilteredProdutos(filtered);
    }
  }

  const handleDeleteProduto = async (id) => {
    try {
      await api.delete(`/produtos/${id}`);
      toast.success('Produto excluído com sucesso.');
      filterProdutos();
    } catch (error) {
      console.error('Erro ao excluir o Produto:', error);
      toast.error('Erro ao excluir o Produto.');
    }
  };

  const handleEditProduto = (produtoItem) => {
    setSelectedProduto({ ...produtoItem });
    setShowModal(true);
  };

  const handleSaveChanges = async () => {
    if (!selectedProduto.nome || !selectedProduto.codigoCA) {
      toast.error('Nome e C.A (numeração) são campos obrigatórios.');
      return;
    }

    try {
      const retorno = await api.put(`/produtos/${selectedProduto._id}`, {
        nome: selectedProduto.nome,
        codigoCA: selectedProduto.codigoCA,
        validadeCA: selectedProduto.validadeCA,
        fabricacao: selectedProduto.fabricacao,
        quantidade: selectedProduto.quantidade,
      });

      if (retorno.status === 200) {
        toast.success('Alterações salvas com sucesso.');
        setShowModal(false);
        filterProdutos();
      } else {
        toast.error('Erro ao salvar as alterações.');
      }
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error);
      toast.error('Erro ao salvar as alterações.');
    }
  };

  const closeModal = () => {
    setSelectedProduto({
      _id: '',
      nome: '',
      codigoCA: '',
      validadeCA: '',
      fabricacao: '',
      quantidade: '',
    });
    setShowModal(false);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>C.A</th>
            <th>Validade C.A</th>
            <th>Fabricação</th>
            <th>Quantidade</th>
            <th>Excluir</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {filteredProdutos?.length > 0 ? (
            filteredProdutos.map((produtoItem) => (
              <tr key={produtoItem._id}>
                <td>{produtoItem.nome}</td>
                <td>{produtoItem.codigoCA}</td>
                <td>{formatDate(produtoItem.validadeCA)}</td>
                <td>{formatDate(produtoItem.fabricacao)}</td>
                <td>{produtoItem.quantidade}</td>
                <td align="center">
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteProduto(produtoItem._id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
                <td align="center">
                  <Button
                    variant="secondary"
                    onClick={() => handleEditProduto(produtoItem)}
                  >
                    <FaEdit  />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Nenhum produto encontrado.</td>
            </tr>
          )}
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
            <Form.Group controlId="formCodigoCA">
              <Form.Label>C.A </Form.Label>
              <Form.Control
                type="number"
                placeholder="C.A (numeração) do Produto"
                value={selectedProduto.codigoCA}
                onChange={(e) =>
                  setSelectedProduto({
                    ...selectedProduto,
                    codigoCA: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formValidadeCA">
              <Form.Label>Validade C.A</Form.Label>
              <Form.Control
                type="text"
                value={formatDate(selectedProduto.validadeCA)}
                onChange={(e) =>
                  setSelectedProduto({
                    ...selectedProduto,
                    validadeCA: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formFabricacao">
              <Form.Label>Fabricação</Form.Label>
              <Form.Control
                type="text"
                value={formatDate(selectedProduto.fabricacao)}
                onChange={(e) =>
                  setSelectedProduto({
                    ...selectedProduto,
                    fabricacao: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formQuantidade">
              <Form.Label>Quantidade</Form.Label>
              <Form.Control
                type="number"
                value={selectedProduto.quantidade}
                onChange={(e) =>
                  setSelectedProduto({
                    ...selectedProduto,
                    quantidade: e.target.value,
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
