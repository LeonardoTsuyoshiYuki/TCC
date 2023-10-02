import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Modal, Form, Button, Table } from 'react-bootstrap';
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
  //console.log("***listagem._id", listagem[0]._id)

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const fetchData = async () => {
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
  };

  const handleClickAddProduto = async () => {
    try {
        await api.put(`listaEpi/${listagem[0]._id}`, {
          produtos: [
            {
              produto: produtoData.produto,
              quantidade: produtoData.quantidade,
              entrega: produtoData.entrega,
              vistoEntrega: produtoData.vistoEntrega,
            },
          ],
        })

      handleCloseModal();
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [matriculaParam]);

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
              </tr>
            </thead>
            <tbody>
              {listagem[0].produtos.map((produto, index) => (
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
                </tr>
              ))}
            </tbody>
          </Table>
        )}
       <div style={{ textAlign: 'right', marginTop: '20px' }}>
          <Button variant="primary" style={{ marginRight: '10px' }} onClick={handleShowModal}>
            Adicionar
          </Button>
          <Button variant="secondary">
            Editar
          </Button>
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