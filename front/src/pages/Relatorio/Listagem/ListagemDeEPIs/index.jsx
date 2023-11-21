import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Modal, Form, Button, Table } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import Header from '../../../../components/Header';
import api from '../../../../services/services';

function ListagemTela() {
  const location = useLocation();
  const matriculaParam = new URLSearchParams(location.search).get('matricula');
  const [listagem, setListagem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [produtoData, setProdutoData] = useState({
    produto: '',
    quantidade: 0,
    entrega: '',
    vistoEntrega: 'YES',
  });
  const [produtosDisponiveis, setProdutosDisponiveis] = useState([]);
  const [selectedProduto, setSelectedProduto] = useState(null);

  const handleShowDetalhes = (produto) => {
    setSelectedProduto(produto);
  };

  const handleCloseDetalhes = () => {
    setSelectedProduto(null);
  };


  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const fetchData = useCallback(async () => {
    try {
      if (matriculaParam) {
        const matriculaResponse = await api.get(`/colaboradores?matricula=${matriculaParam}`);
        const idListagem = matriculaResponse?.data?.colaborador[0]?.listagem?._id;

        if (idListagem) {
          const listagemResponse = await api.get(`listaEpi/?_id=${idListagem}`);
          setListagem(listagemResponse?.data?.docs || []);
        }
      }


      const produtosResponse = await api.get('/produtos');
      const produtos = produtosResponse?.data?.docs || [];
      setProdutosDisponiveis(produtos);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  }, [matriculaParam]);

  const handleClickAddProduto = async () => {
    try {
      if (produtoData._id) {

        await api.put(`listaEpi/${listagem[0]._id}`, {
          produtos: [
            {
              _id: produtoData._id,
              produto: produtoData.produto,
              quantidade: produtoData.quantidade,
              entrega: produtoData.entrega,
              vistoEntrega: produtoData.vistoEntrega,
            },
            ...listagem[0].produtos.filter(prod => prod._id !== produtoData._id)
          ],
        });
      } else {
        await api.put(`listaEpi/${listagem[0]._id}`, {
          produtos: [
            ...listagem[0].produtos,
            {
              produto: produtoData.produto,
              quantidade: produtoData.quantidade,
              entrega: produtoData.entrega,
              vistoEntrega: produtoData.vistoEntrega,
            },
          ],
        });
      }

      handleCloseModal();
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  };

  const handleClickEditProduto = async () => {
    try {
      if (produtoData._id) {
        await api.put(`listaEpi/${listagem[0]._id}`, {
          produtos: [
            ...listagem[0].produtos,
            {
              devolucao: produtoData.devolucao,
              vistoDevolucao: produtoData.vistoDevolucao,
            },
          ],
        });
      }

      handleCloseModal();
    } catch (error) {
      console.error('Erro ao adicionar/editar produto:', error);
    }
  }


  useEffect(() => {
    fetchData();
  }, [fetchData, handleClickAddProduto]);

  const formatarData = (data) => {
    if (!data) return '';
    const dataObj = new Date(data);
    if (isNaN(dataObj.getTime())) return '';
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };


  return (
    <>
      <Header />
      <br />
      <Container>
        <br />
        <h1 style={{ textAlign: 'center', color: 'white' }}>Listagem De EPIs</h1>
        <br />
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Código CA</th>
                <th>Validade CA</th>
                <th>Fabricação</th>
                <th>Entrega</th>
                <th>Visto de Entrega</th>
                <th>Devolução</th>
                <th>Visto de Devolução</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {listagem[0]?.produtos && listagem[0]?.produtos.map((produto, index) => (
                <tr key={produto._id}>
                  <td>{produto.produto.nome || ''}</td>
                  <td>{produto.quantidade || ''}</td>
                  <td>{produto.produto.codigoCA || ''}</td>
                  <td>{formatarData(produto.produto.validadeCA) || ''}</td>
                  <td>{formatarData(produto.produto.fabricacao) || ''}</td>
                  <td>{formatarData(produto.entrega) || ''}</td>
                  <td>{produto.vistoEntrega || ''}</td>
                  <td>{formatarData(produto.devolucao) || ''}</td>
                  <td>{produto.vistoDevolucao || ''}</td>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() => handleShowDetalhes(produto)}
                    >
                      <FaEdit />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <div style={{ textAlign: 'right', marginTop: '20px' }}>
          <Button variant="primary" style={{ marginRight: '10px' }} onClick={handleShowModal}>
            Adicionar
          </Button>
          <Modal show={!!selectedProduto} onHide={handleCloseDetalhes}>
            <Modal.Header closeButton>
              <Modal.Title>Detalhes do Produto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedProduto && (
                <>
                  <p><strong>Produto:</strong> {selectedProduto.produto.nome}</p>
                  <p><strong>Quantidade:</strong> {selectedProduto.quantidade}</p>
                  <p><strong>Código CA:</strong> {selectedProduto.produto.codigoCA}</p>
                  <p><strong>Validade CA:</strong> {formatarData(selectedProduto.produto.validadeCA)}</p>
                  <p><strong>Fabricação:</strong> {formatarData(selectedProduto.produto.fabricacao)}</p>
                  <p><strong>Entrega:</strong> {formatarData(selectedProduto.entrega)}</p>
                  <p><strong>Visto de Entrega:</strong> {selectedProduto.vistoEntrega}</p>


                  <Form>

                    <Form.Group controlId="formEntrega">
                      <Form.Label>Data de Devolução</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        value={produtoData.entrega}
                        onChange={(e) => setProdutoData({ ...produtoData, entrega: e.target.value })}
                      />
                    </Form.Group>

                    <Form.Group controlId="formVistoEntrega">
                      <Form.Label>Visto de Devolução</Form.Label>
                      <Form.Control
                        as="select"
                        value={produtoData.vistoEntrega}
                        onChange={(e) => setProdutoData({ ...produtoData, vistoEntrega: e.target.value })}
                      >
                        <option value="YES">YES</option>
                        <option value="NO">NO</option>
                      </Form.Control>
                    </Form.Group>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Button variant="secondary" onClick={handleCloseDetalhes} style={{ backgroundColor: 'red', color: 'white' }}>
                        Cancelar
                      </Button>
                      <Button variant="primary" onClick={handleClickEditProduto} style={{ backgroundColor: 'green', color: 'white' }}>
                        Confirmar
                      </Button>
                    </div>
                  </Form>
                </>
              )}
            </Modal.Body>
          </Modal>

        </div>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Adicionar Produto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formProduto">
                <Form.Label>Produto</Form.Label>
                <Form.Control
                  as="select"
                  value={produtoData.produto}
                  onChange={(e) => setProdutoData({ ...produtoData, produto: e.target.value })}
                >
                  <option value="">Selecione um produto</option>
                  {produtosDisponiveis.map((produto) => (
                    <option key={produto._id} value={produto._id}>
                      {produto.nome}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formQuantidade">
                <Form.Label>Quantidade</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Quantidade"
                  value={produtoData.quantidade}
                  onChange={(e) => setProdutoData({ ...produtoData, quantidade: parseInt(e.target.value, 10) })}
                />
              </Form.Group>

              <Form.Group controlId="formEntrega">
                <Form.Label>Data de Entrega</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={produtoData.entrega}
                  onChange={(e) => setProdutoData({ ...produtoData, entrega: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="formVistoEntrega">
                <Form.Label>Visto de Entrega</Form.Label>
                <Form.Control
                  as="select"
                  value={produtoData.vistoEntrega}
                  onChange={(e) => setProdutoData({ ...produtoData, vistoEntrega: e.target.value })}
                >
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </Form.Control>
              </Form.Group>
              <br/>
              <Button variant="primary" onClick={handleClickAddProduto}>
                Adicionar Produto
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}

export default ListagemTela;