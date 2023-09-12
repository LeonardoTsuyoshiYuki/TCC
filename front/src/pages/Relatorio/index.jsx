import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from '../../components/Header';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';

function Relatorio(props) {
  // Estado para a matrícula e seleção
  const [matricula, setMatricula] = useState('');
  const [select, setSelect] = useState('listaDeEpis');

  // Função para lidar com a mudança na matrícula
  const handleMatriculaChange = (event) => {
    setMatricula(event.target.value);
  };

  // Função para lidar com a mudança na seleção
  const handleSelectChange = (event) => {
    setSelect(event.target.value);
  };

  // Função para lidar com o clique no botão "Buscar"
  const navigate = useNavigate();
  const handleBuscarClick = () => {
    // Verifica a opção selecionada e navega para a rota correspondente
    if (select === 'listaDeEpis') {
      navigate(`/listaepi?matricula=${matricula}`);
    } else if (select === 'inspecoes') {
      navigate(`/inspecoes?matricula=${matricula}`);
    }
  };

  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Container className="d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h1 style={{ color: 'white' }}>RELATÓRIO</h1>
          <br />
          <Form.Group>
            <Form.Label htmlFor="matricula" style={{ color: 'white' }}>
              Matrícula:
            </Form.Label>
            <Form.Control
              type="text"
              id="matricula"
              value={matricula}
              onChange={handleMatriculaChange}
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label htmlFor="selecionarOpcao" style={{ color: 'white' }}>
              Selecionar Opção:
            </Form.Label>
            <Form.Control
              as="select"
              id="selecionarOpcao"
              value={select}
              onChange={handleSelectChange}
            >
              <option value="listaDeEpis">Lista de Epis</option>
              <option value="inspecoes">Inspeções</option>
            </Form.Control>
          </Form.Group>
          <br />
          <Button
            variant="primary"
            onClick={handleBuscarClick}
            style={{ width: 'calc(60% + 20px)' }}
          >
            Buscar
          </Button>
        </div>
      </Container>
    </>
  );
}

export default Relatorio;
