import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabContainer, Container, Form, Stack } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/Header'; // Importe o componente Header
import CadastroFuncao from './CadastroFuncao'; // Importe o componente CadastroFuncao
import ListaFuncao from './ListaFuncao'; // Importe o componente ListaFuncao
import api from '../../services/services';
import GlobalStyle from '../../styles/global';

function Funcao(props) {
  const [searchValueFuncao, setSearchValueFuncao] = useState('');
  const [funcoes, setFuncoes] = useState([]);
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [atualizarTabela, setAtualizarTabela ] = useState(false);

  useEffect( () => {
     BuscaFuncao();
  }, [atualizarTabela]);

  async function BuscaFuncao () {
    try {
      const retorno = await api.get('/funcao');
      setFuncoes(retorno.data.docs);
      setAtualizarTabela()
    } catch (error) {
      console.error('Erro ao buscar funções:', error);
    }
  };

   async function handleSearchFuncao () {
    try {
      const retorno = await api.get('/funcao', {
        params: {
          search: searchValueFuncao // Envie o valor de busca para o backend
        }
      });
      setFuncoes(retorno.data.docs); // Atualize o estado com os resultados da busca
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
              <CadastroFuncao 
                nome={nome}
                setNome={setNome}
                tipo={tipo}
                setTipo={setTipo}
                atualizarTabela={setAtualizarTabela}
              />
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
