import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';


const EntradaInspecao = () => {
  const [matricula, setMatricula] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const matriculaExiste = true;
  
    if (matriculaExiste) {
      navigate(`/entradaInspecao?matricula=${matricula}`);
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
          <h1 style={{ color: 'white' }}>INSPEÇÃO</h1>
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

export default EntradaInspecao;
