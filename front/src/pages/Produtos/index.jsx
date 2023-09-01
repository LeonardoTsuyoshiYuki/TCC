import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabContainer, Container, Form, Stack, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/Header';
import CadastroProdutos from './CadastroProdutos'; // Importe o componente CadastroProduto
import ListaProdutos from './ListaProdutos'; // Importe o componente ListaProduto
import api from '../../services/services';
import GlobalStyle from '../../styles/global';

function Produtos() {
  const [searchValueProduto, setSearchValueProduto] = useState('');
  const [produtos, setProdutos] = useState();

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await api.get('/produtos'); // Use a rota correta para produtos
      console.error('*******************response:', response);
      
      setProdutos(response);

    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };


  const handleSearchProduto = async () => {
    try {
      const response = await api.get('/produtos', {
        params: {
          search: searchValueProduto
        }
      });
      setProdutos(response.data.docs);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      toast.error('Erro ao buscar produtos.');
    }
  };

  return (
    <>
      <Header />

      <Container>
        <h1 style={{ textAlign: 'center', color: 'white' }}>PRODUTOS</h1>
        <br />
        <TabContainer>
          <Tabs
            defaultActiveKey="listagem"
            id="uncontrolled-tab-example"
            className="mb-3"
            fill
          >
            <Tab eventKey="listagem" title="Listagem">
              <Stack direction="horizontal" gap={3}>
                <Form.Control
                  type="search"
                  placeholder="Filtrar por Nome ou C.A"
                  value={searchValueProduto}
                  onChange={(e) => setSearchValueProduto(e.target.value)}
                />
                <Button variant="primary" onClick={handleSearchProduto}>
                  Buscar
                </Button>
              </Stack>
              <br/>
              <ListaProdutos
                produtos={produtos}
                searchValue={searchValueProduto}
                setProdutos={setProdutos}
              />
            </Tab>
            <Tab eventKey="profile" title="Cadastro">
              <CadastroProdutos />
            </Tab>
          </Tabs>
        </TabContainer>
      </Container>
      <ToastContainer autoClose={2000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default Produtos;
