import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabContainer, Container, Form, Stack, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/Header'; // Importe o componente Header
import CadastroFuncao from './CadastroFuncao'; // Importe o componente CadastroFuncao
import ListaFuncao from './ListaFuncao'; // Importe o componente ListaFuncao
import api from '../../services/services';
import GlobalStyle from '../../styles/global';

function Funcao() {
  const [searchValueFuncao, setSearchValueFuncao] = useState('');
  const [funcoes, setFuncoes] = useState([]);

  useEffect(() => {
    fetchFuncoes();
  }, []);

  const fetchFuncoes = async () => {
    try {
      const response = await api.get('/funcao');
      setFuncoes(response.data.docs);
    } catch (error) {
      console.error('Erro ao buscar funções:', error);
    }
  };

  const handleSearchFuncao = async () => {
    try {
      const response = await api.get('/funcao', {
        params: {
          search: searchValueFuncao // Envie o valor de busca para o backend
        }
      });
      setFuncoes(response.data.docs); // Atualize o estado com os resultados da busca
    } catch (error) {
      console.error('Erro ao buscar funções:', error);
      toast.error('Erro ao buscar funções.');
    }
  };

  return (
    <>
      <Header />

      <Container>
      <h1 style={{ textAlign: 'center', color: 'white' }}>FUNÇÃO</h1>
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
                  placeholder="Filtrar por Função ou Cargo"
                  value={searchValueFuncao}
                  onChange={(e) => setSearchValueFuncao(e.target.value)}
                />
          
              </Stack>
              <br/>
              <ListaFuncao
                funcoes={funcoes}
                searchValue={searchValueFuncao}
                setFuncoes={setFuncoes}
              />
            </Tab>
            <Tab eventKey="profile" title="Cadastro">
              <CadastroFuncao />
            </Tab>
          </Tabs>
        </TabContainer>
      </Container>
      <ToastContainer autoClose={2000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default Funcao;
