import React, { useState, useEffect } from 'react';
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import TabContainer from "react-bootstrap/TabContainer"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Stack from "react-bootstrap/Stack"
import { ToastContainer, toast } from 'react-toastify';
import Header from '../../components/Header';
import ListagemColaborador from './ListaColaborador';
import api from '../../services/services';
import GlobalStyle from '../../styles/global';

function Colaborador(props) {
  const [searchValueColaborador, setSearchValueColaborador] = useState('');
  const [dataset, setDataset] = useState({});

  useEffect(() => {
    fetchColaboradores();
  }, []);

  const fetchColaboradores = async () => {
    try {
      const response = await api.get('/colaboradores');
      console.log("****************response", response)
    setDataset(response);
    } catch (error) {
      console.error('Erro ao buscar colaboradores:', error);
      toast.error('Erro ao buscar colaboradores.');
    }
  };

  const handleSearchColaboradores = async () => {
    try {
      const response = await api.get('/colaboradores', {
        params: {
          search: searchValueColaborador,
        },
      });
      setDataset(response.data);
    } catch (error) {
      console.error('Erro ao buscar colaboradores:', error);
      toast.error('Erro ao buscar colaboradores.');
    }
  };

  return (
    <>
      <Header />

      <Container>
        <h1 style={{ textAlign: 'center', color: 'white' }}>COLABORADOR</h1>
        <br />
        <TabContainer>
          <Tabs defaultActiveKey="listagem" id="uncontrolled-tab-example" className="mb-3" fill>
            <Tab eventKey="listagem" title="Listagem">
             
              <br />
              <ListagemColaborador
                dataset={dataset}
                setColaboradorData={setDataset}
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
