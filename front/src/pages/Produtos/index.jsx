import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabContainer, Container, Form, Stack } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/Header';
import CadastroProdutos from './CadastroProdutos'; // Importe o componente CadastroProduto
import ListaProdutos from './ListaProdutos'; // Importe o componente ListaProduto
import api from '../../services/services';
import GlobalStyle from '../../styles/global';

function Produtos(props) {
  const [searchValueProdutos, setSearchValueProdutos] = useState('');
  const [produtos, setProsutos] = useState();

  useEffect(() => {
    BuscaProduto();
  }, []);

  async function BuscaProduto (){
    try {
      const retorno = await api.get('/produtos');
      // console.log("**********retornoProdutos", retorno)
      setProsutos(retorno.data.docs)
    } catch (error) {
      console.error('Erro ao buscar os dados de Produtos:', error);
    }
  };

  async function handleSearchFuncao(){
    try {
      const retorno = await api.get('/produtos', {
        params: {
          search: searchValueProdutos // Envie o valor de busca para o backend
        }
      });
      setProsutos(retorno.data.docs); // Atualize o estado com os resultados da busca
    } catch (error) {
      console.error('Erro ao buscar o Produto:', error);
      toast.error('Erro ao buscar o Produto.');
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
                  value={searchValueProdutos}
                  onChange={(e) => setSearchValueProdutos(e.target.value)}
                />
              </Stack>
              <br/>
              <ListaProdutos
                produtos={produtos}
                searchValueProdutos={searchValueProdutos}
                setProsutos={setProsutos}
              />
            </Tab>
            <Tab eventKey="profile" title="Cadastro">
              {/* <CadastroProdutos /> */}
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
