import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import { FaTrash, FaEdit } from 'react-icons/fa';
import Table from 'react-bootstrap/Table';
import Header from '../../../../components/Header';
import { Container } from 'react-bootstrap';
import api from '../../../../services/services';

function ListagemTela() {
  const location = useLocation();
  const matriculaParam = new URLSearchParams(location.search).get('matricula');
  const [listagem, setListagem] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("********listagem", listagem)


  // const handleDelete = () => {
  //   // Lógica para exclusão
  // };

  // const handleEdit = () => {
  //   // Lógica para edição
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (matriculaParam) {
          const matriculaResponse = await api.get(`/colaboradores?matricula=${matriculaParam}`);
          const idListagem = matriculaResponse?.data?.colaborador[0]?.listagem?._id;

          if (idListagem) {
            const listagemResponse = await api.get(`listaEpi/?_id=${idListagem}`);
            console.log('Dados da API:', listagemResponse.data);
            setListagem(listagemResponse?.data?.docs || []);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

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
      <br/>
      <Container>
        <br/>
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
      </Container>
    </>
  );
}

export default ListagemTela;
