import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import api from "../../../services/services";
import { ToastContainer, toast } from 'react-toastify';
import { Container } from "react-bootstrap";
import Header from "../../../components/Header";

const listStyle = {
    listStyleType: 'none',
    padding: 0,
};

const listItemStyle = {
    backgroundColor: '#333',
    color: 'white',
    padding: '8px',
    marginBottom: '8px',
};

const radioLabelStyle = {
    marginRight: '10px', // Adicione margem à direita para criar espaço entre o texto da pergunta e os radio buttons.
};

const containerStyle = {
    backgroundColor: '#708090', // Adicione um fundo branco ao Container.
    padding: '20px', // Adicione um preenchimento para criar espaço entre o conteúdo e a borda do Container.
};
function CadastroInspecao() { // Corrigido o nome da função
    const location = useLocation();
    const matriculaParam = new URLSearchParams(location.search).get('matricula');
    const [perguntas, setPerguntas] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [observacoes, setObservacoes] = useState('');
    const [listagem, setListagem] = useState();
    // console.log(listagem)
    useEffect(() => {
        buscaPerguntas();
        if (matriculaParam) {
            buscaData();
        }
    }, [matriculaParam]); // Adicionado matriculaParam como dependência do useEffect

    async function buscaPerguntas() {
        try {
            const response = await api.get(`/pergunta`);
            setPerguntas(response.data);

            const initialSelectedAnswers = {};
            response.data.forEach((pergunta) => {
                initialSelectedAnswers[pergunta._id] = null;
            });
            setSelectedAnswers(initialSelectedAnswers);
        } catch (error) {
            console.error('Erro ao buscar perguntas:', error);
            toast.error('Erro ao buscar perguntas.');
        }
    }

    async function buscaData() {
        try {
            const matriculaResponse = await api.get(`/colaboradores?matricula=${matriculaParam}`);
            const idListagem = matriculaResponse?.data?.colaborador[0]?.listagemInspecoes?._id;
            setListagem(idListagem);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    }

    function handleAnswerChange(perguntaId, answer) {
        setSelectedAnswers({ ...selectedAnswers, [perguntaId]: answer });
    }

    function handleObservacoesChange(event) {
        setObservacoes(event.target.value);
    }

    async function handleFinalizar() {
        const perguntasComRespostas = perguntas.filter((pergunta) => selectedAnswers[pergunta._id] !== null);
        
        const inspecao = {
            perguntas: [],
            observacoes,
        };
        
        perguntasComRespostas.forEach((pergunta) => {
            inspecao.perguntas.push({
                pergunta: pergunta._id,
                resposta: selectedAnswers[pergunta._id],
            });
        });
        
        console.log(inspecao)
        // Verifica se há uma listagem disponível
        if (listagem) {
            try {
                // Envia os dados para o servidor
                await api.post(`/inspecao/${listagem}`, inspecao);
                setSelectedAnswers({});
                setObservacoes('');
                toast.success('Inspeção finalizada com sucesso!');
            } catch (error) {
                console.error('Erro ao finalizar inspeção:', error);
                toast.error('Erro ao finalizar inspeção.');
            }
        } else {
            toast.error('Nenhuma listagem encontrada. Certifique-se de que a matrícula seja válida.');
        }
    }
    

    return (
        <div>
            <Header />
            <Container style={containerStyle}>
                <div style={{ textAlign: 'center' }}>
                    <h1 >Listagem de Perguntas</h1>
                    {perguntas.length > 0 ? (
                        <ul style={listStyle}>
                            {perguntas.map((pergunta, index) => (
                                <li key={pergunta._id} style={{ ...listItemStyle, marginTop: '20px' }}>
                                    <strong>{index + 1} - </strong> {pergunta.pergunta}
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div className="d-flex justify-content-center align-items-center" style={{ width: '33%' }}>
                                            <label style={radioLabelStyle}>
                                                <input
                                                    type="radio"
                                                    value="S"
                                                    checked={selectedAnswers[pergunta._id] === "S"}
                                                    onChange={() => handleAnswerChange(pergunta._id, "S")}
                                                /> S
                                            </label>
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center" style={{ width: '33%' }}>
                                            <label style={radioLabelStyle}>
                                                <input
                                                    type="radio"
                                                    value="N"
                                                    checked={selectedAnswers[pergunta._id] === "N"}
                                                    onChange={() => handleAnswerChange(pergunta._id, "N")}
                                                /> N
                                            </label>
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center" style={{ width: '33%' }}>
                                            <label style={radioLabelStyle}>
                                                <input
                                                    type="radio"
                                                    value="S/N"
                                                    checked={selectedAnswers[pergunta._id] === "S/N"}
                                                    onChange={() => handleAnswerChange(pergunta._id, "S/N")}
                                                /> S/N
                                            </label>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p style={{ color: 'white' }}>Nenhuma pergunta disponível.</p>
                    )}

                    {/* Campo de observações com Bootstrap */}
                    <div className="form-group" style={{ marginTop: '20px' }}>
                        <label style={{ color: 'white' }}>Observações:</label>
                        <textarea
                            className="form-control"
                            rows="4"
                            value={observacoes}
                            onChange={handleObservacoesChange}
                        />
                    </div>
                    <br />
                    <button className="btn btn-primary" onClick={handleFinalizar}>
                        Finalizar
                    </button>

                    <ToastContainer />
                </div>
            </Container>
        </div>
    );
}

export default CadastroInspecao