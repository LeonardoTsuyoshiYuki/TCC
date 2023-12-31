import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';

function EntradaTela(){
  const [matricula, setMatricula] = useState('');
  const [opcao, setOpcao] = useState('listagem_epis');
  const navigate = useNavigate();
  
  // URL base para navegação
  const baseURL = '/relatorio';

  const handleNavigation = () => {
    // Define a URL com base na opção selecionada
    const url = opcao === 'listagem_epis' ? `${baseURL}Listagem` : `${baseURL}Inspecao`;

    // Navega para a URL com a matrícula
    navigate(`${url}?matricula=${matricula}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifique se a matrícula existe
    const matriculaExiste = true;

    if (matriculaExiste) {
      handleNavigation();
    } else {
      alert('Matrícula não encontrada.');
    }
  };

  return (
    <>
      <Header />
      <br /><br />
      <Container className="d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h1 style={{ color: 'white' }}>RELATÓRIO</h1>
          <Row className="mt-5">
            <Col>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formMatricula">
                  <Form.Label style={{ color: 'white' }}>Matrícula:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite sua matrícula"
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value)}
                  />
                </Form.Group>
                <br />
                <Form.Group controlId="formOpcoes">
                  <Form.Label style={{ color: 'white' }}>
                    Escolha uma opção:
                  </Form.Label>
                  <Form.Control
                    as="select"
                    value={opcao}
                    onChange={(e) => setOpcao(e.target.value)}
                  >
                    <option value="listagem_epis">Listagem de EPIS</option>
                    <option value="listagem_inspecoes">
                      Listagem de Inspeções
                    </option>
                  </Form.Control>
                </Form.Group>
                <br />
                <Button variant="primary" type="submit">
                  Enviar
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default EntradaTela;
