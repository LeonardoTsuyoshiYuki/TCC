import React, { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TabContainer from 'react-bootstrap/TabContainer';
import Container from 'react-bootstrap/Container';
import { Form, Stack } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import Header from '../../components/Header';
import ListagemColaborador from './ListaColaborador';
import api from '../../services/services';
import GlobalStyle from '../../styles/global';

function Colaborador(props) {
  const [searchValueColaborador, setSearchValueColaborador] = useState('');
  const [dataset, setDataset] = useState([]);
  const [atualizarTabela, setAtualizarTabela] = useState(false);

  useEffect(() => {
    BuscaColaboradores();
  }, [atualizarTabela]);

  async function BuscaColaboradores() {
    try {
      const retorno = await api.get('/colaboradores');
      setDataset(retorno);
      setAtualizarTabela(false); // Fix: setAtualizarTabela should be set to false
    } catch (error) {
      console.error('Erro ao buscar colaboradores:', error);
      toast.error('Erro ao buscar colaboradores.');
    }
  }

  return (
    <>
      <Header />
      <Container>
        <h1 style={{ textAlign: 'center', color: 'white' }}>COLABORADOR</h1>
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
                  value={searchValueColaborador}
                  onChange={(e) => {
                    setSearchValueColaborador(e.target.value);
                  }}
                />
              </Stack>
              <br />
              <ListagemColaborador
                dataset={dataset}
                AtualizarTabela={setAtualizarTabela}
                searchValue={searchValueColaborador}
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

export default Colaborador;
