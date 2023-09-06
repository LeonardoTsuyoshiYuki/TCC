import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Container, Form, Button, Stack } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/Header';
import CadastroProdutos from './CadastroProdutos';
import ListaProdutos from './ListaProdutos';
import api from '../../services/services';
import GlobalStyle from '../../styles/global';

function Produtos() {
  const [searchValueProdutos, setSearchValueProdutos] = useState('');
  const [produtos, setProdutos] = useState();
 
  useEffect(() => {
    Buscadados();
  }, [produtos]);

  async function Buscadados() {
    try {
      const response = await api.get('/produtos');
      setProdutos(response.data.docs);
    } catch (error) {
      console.error('Erro ao buscar os dados de Produtos:', error);
      toast.error('Erro ao buscar os dados de Produtos.');
    }
  }

  async function handleSearchFunction() {
    try {
      const response = await api.get('/produtos', {
        params: {
          search: searchValueProdutos,
        },
      });
      setProdutos(response.data.docs);
    } catch (error) {
      console.error('Erro ao buscar o Produto:', error);
      toast.error('Erro ao buscar o Produto.');
    }
  }

  return (
    <>
      <Header />
      <Container>
        <h1 style={{ textAlign: 'center', color: 'white' }}>PRODUTOS</h1>
        <br />
        <Tabs defaultActiveKey="listagem" id="uncontrolled-tab-example" className="mb-3" fill>
          <Tab eventKey="listagem" title="Listagem">
            <Stack direction="horizontal" gap={3}>
              <Form.Control
                type="search"
                placeholder="Filtrar por Nome ou C.A"
                value={searchValueProdutos}
                onChange={(e) => setSearchValueProdutos(e.target.value)}
              />
              <Button variant="primary" onClick={handleSearchFunction}>Buscar</Button>
            </Stack>
            <br />
            <ListaProdutos
              produtos={produtos}
              searchValueProdutos={searchValueProdutos}
              Buscadados={Buscadados}
            />
          </Tab>
          <Tab eventKey="profile" title="Cadastro">
            <CadastroProdutos produtos={produtos} Buscadados={Buscadados} />
          </Tab>
        </Tabs>
      </Container>
      <ToastContainer autoClose={2000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default Produtos;
