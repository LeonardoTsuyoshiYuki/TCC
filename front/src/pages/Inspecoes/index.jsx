import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import api from "../../../../services/services";
import Header from "../../../../components/Header";

const ListaInspecoes = () => {
    const perguntas = [
        "1 - Os trabalhadores estão utilizando os EPIs adequados, como capacetes, luvas isolantes, óculos de segurança e vestimentas apropriadas?",
        "2 - As ferramentas e equipamentos utilizados na leitura de energia estão em boas condições de funcionamento e são regularmente inspecionados quanto a danos ou desgaste?",
        "3 - As áreas de trabalho estão devidamente sinalizadas para alertar sobre os perigos elétricos? Existem barreiras de segurança em vigor?",
        "4 - As vias de acesso aos medidores de energia estão desobstruídas e em boas condições?",
        "5 - Os medidores de energia estão protegidos contra intempéries e danos mecânicos?",
        "6 - As conexões elétricas dos medidores de energia estão bem apertadas e protegidas contra corrosão?",
        "7 - Os trabalhadores estão cientes das distâncias seguras a serem mantidas de linhas de transmissão e equipamentos elétricos energizados?",
        "8 - Existe um plano de ação em caso de emergência, como um curto-circuito ou incêndio, e os trabalhadores estão treinados para agir de acordo com esse plano?",
        "9 - Os trabalhadores estão cientes dos procedimentos de desligamento e bloqueio/tagout para garantir a segurança ao realizar manutenção ou reparos nos medidores de energia?",
        "10 - Os trabalhadores foram treinados para reconhecer sinais de choque elétrico, como faíscas, cheiro de queimado ou equipamentos quentes, e sabem como reagir em caso de suspeita de choque elétrico?",
        "11 - Existe um procedimento de comunicação eficaz entre os trabalhadores que estão realizando as leituras de energia e a equipe de controle de energia para garantir que os circuitos sejam desligados quando necessário?",
        "12 - Os trabalhadores estão cientes dos procedimentos de primeiros socorros em caso de acidente elétrico?",
        "13 - Os registros de manutenção e inspeção estão sendo mantidos e atualizados regularmente?",
        "14 - Existe uma política de relatórios de incidentes para garantir que qualquer incidente relacionado à segurança seja relatado e investigado adequadamente?",
        "15 - Os trabalhadores estão conscientes das normas de segurança elétrica aplicáveis, como a NFPA 70E ou outras regulamentações locais?"
    ];

    const [respostas, setRespostas] = useState({});
    const [observacao, setObservacao] = useState('');

    const handleRespostaChange = (pergunta, resposta) => {
        setRespostas({ ...respostas, [pergunta]: resposta });
    };

    const handleObservacaoChange = (e) => {
        setObservacao(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            // Certifique-se de que as perguntas estejam corretamente formatadas
            const perguntasFormatadas = perguntas.map((pergunta, index) => ({
                pergunta,
                resposta: respostas[pergunta] || 'Não Respondido', // Defina um valor padrão caso a pergunta não tenha sido respondida
            }));

            // Envie as perguntas formatadas e a observação para a API
            const response = await api.post('/pergunta', {
                perguntas: perguntasFormatadas,
                observacao,
            });

            // Lide com a resposta da API, por exemplo, redirecione ou exiba uma mensagem de sucesso
            console.log('Resposta da API:', response.data);

            // Limpe o estado após o envio bem-sucedido
            setRespostas({});
            setObservacao('');
        } catch (error) {
            console.error('Erro ao enviar respostas:', error);
        }
    };

    return (
        <>
            <Header />
            <br />
            <Container>
                <h1 style={{ textAlign: 'center', color: 'white' }}>Lista de Inspeções</h1>
                <br />
                <Form style={{ color: "white" }}>
                    {perguntas.map((pergunta, index) => (
                        <Form.Group key={index}>
                            <Form.Label>{pergunta}</Form.Label>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="radio"
                                        name={`resposta-${index}`}
                                        label="Sim"
                                        value="sim"
                                        onChange={() => handleRespostaChange(pergunta, 'sim')}
                                        checked={respostas[pergunta] === 'sim'}
                                    />
                                    <br />
                                </Col>
                                <Col>
                                    <Form.Check
                                        style={{ color: "white" }}
                                        type="radio"
                                        name={`resposta-${index}`}
                                        label="Não"
                                        value="nao"
                                        onChange={() => handleRespostaChange(pergunta, 'nao')}
                                        checked={respostas[pergunta] === 'nao'}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        style={{ color: "white" }}
                                        type="radio"
                                        name={`resposta-${index}`}
                                        label="S/N"
                                        value="sn"
                                        onChange={() => handleRespostaChange(pergunta, 'sn')}
                                        checked={respostas[pergunta] === 'sn'}
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                    ))}
                    <Form.Group>
                        <Form.Label style={{ textAlign: 'center', color: 'white' }}>Observação</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={observacao}
                            onChange={handleObservacaoChange}
                        />
                    </Form.Group>
                    <br />
                    <Button style={{ textAlign: 'center', color: 'white' }} variant="primary" onClick={handleSubmit}>
                        Enviar Respostas
                    </Button>
                </Form>
            </Container>
        </>
    );
};

export default ListaInspecoes;
