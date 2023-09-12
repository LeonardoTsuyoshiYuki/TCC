import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from '../../components/Header';
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";


function Relatorio(props) {
    const [matricula, setMatricula] = useState('');
    const [select, setSelect] = useState('listaDeEpis')
    const navigate = useNavigate()

    const handleMatriculaChange = (event) => {
        setMatricula(event.target.value);
    };

    const handleSelectChange = (event) => {
        setSelect(event.target.value);
    };

    const handleBuscarClick = () => {
         navigate("/listaepi") 
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
                        <Form.Label htmlFor="matricula" style={{ color: 'white' }}>Matrícula:</Form.Label>
                        <Form.Control
                            type="text"
                            id="matricula"
                            value={matricula}
                            onChange={handleMatriculaChange}
                        />
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label htmlFor="selecionarOpcao" style={{ color: 'white' }}>Selecionar Opção:</Form.Label>
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
                    <Button variant="primary" onClick={handleBuscarClick} style={{ width: 'calc(60% + 20px)' }}>Buscar</Button>
                </div>
            </Container>
        </>
    );
};

export default Relatorio;
