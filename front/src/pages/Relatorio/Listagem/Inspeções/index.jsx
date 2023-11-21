import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import { Table, Button, Modal, Container, Spinner } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../../services/services";
import Header from "../../../../components/Header";

function ListaInspecoes() {
  const location = useLocation();
  const matriculaParam = new URLSearchParams(location.search).get('matricula');
  const [listagem, setListagem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedInspecao, setSelectedInspecao] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log("selectedInspecao", selectedInspecao)
  const fetchData = async () => {
    try {
      if (matriculaParam) {
        setLoading(true);
        const matriculaResponse = await api.get(`/colaboradores?matricula=${matriculaParam}`);
        const idListagemInspecoes = matriculaResponse?.data?.colaborador[0]?.listagemInspecoes?._id;

        if (idListagemInspecoes) {
          const listagemResponse = await api.get(`listagemInspecao/?id=${idListagemInspecoes}`);

          // console.log("listagemResponse",listagemResponse)
          setListagem(listagemResponse.data.docs);
        }
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      toast.error('Erro ao buscar dados.');
    } finally {
      setLoading(false);
    }
  };


  const handleShowModal = async (inspecaoId) => {
    try {
      const inspecaoResponse = await api.get(`inspecao/?id=${inspecaoId}`);
      setSelectedInspecao(inspecaoResponse.data);
      setShowModal(true);
    } catch (error) {
      console.error('Erro ao buscar dados da inspeção:', error);
      toast.error('Erro ao buscar dados da inspeção.');
    }
  };


  const handleDelete = async (inspecaoId) => {
    try {
      console.log(`Inspeção ${inspecaoId} excluída.`);
      await api.delete(`inspecao/${inspecaoId}`);
    } catch (error) {
      console.error('Erro ao excluir a inspeção:', error);
      toast.error('Erro ao excluir a inspeção.');
    }
  }

  const handleCloseModal = () => {
    setSelectedInspecao(null);
    setShowModal(false);
  };

  useEffect(() => {
    fetchData();
  }, [matriculaParam]);

  return (
    <>
      <Header />
      <Container>
        <br />
        <h1 style={{ textAlign: 'center', color: 'white' }}>Lista de Inspeções</h1>
        <br />
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Registro</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {listagem && listagem.length > 0 ? (
                listagem.map((item) => (
                  <React.Fragment key={item._id}>
                    {item.inspecoes && item.inspecoes.length > 0 ? (
                      item.inspecoes.map((inspecao) => (
                        <tr key={inspecao._id}>
                          <td>{inspecao._id}</td>
                          <td>{new Date(inspecao.registro).toLocaleDateString('pt-BR')}</td>
                          <td>
                            <Button variant="danger" onClick={() => handleDelete(inspecao._id)}>
                              <FaTrash /> Excluir
                            </Button>
                            <Button variant="primary" onClick={() => handleShowModal(inspecao._id)}>
                              <FaEdit /> Inspecionar
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" style={{ textAlign: 'center' }}>Nenhuma inspeção cadastrada para este item.</td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center' }}>Nenhum dado disponível.</td>
                </tr>
              )}
            </tbody>

          </Table>
        )}
        <Modal show={showModal} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>Detalhes da Inspeção</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedInspecao && selectedInspecao.docs && selectedInspecao.docs.length > 0 && (
      <>
        {selectedInspecao.docs.map((inspecao) => (
          <div key={inspecao._id}>
            {inspecao.perguntas.map((pergunta) => (
              <div key={pergunta._id}>
                <p>{pergunta.pergunta.pergunta}</p>
                <p>Resposta: {pergunta.resposta}</p>
              </div>
            ))}
            <p>Observações: {inspecao.observacoes}</p>
            <p>Colaborador: {inspecao.colaborador.nome}</p>
            <p>Registro: {new Date(inspecao.registro).toLocaleString()}</p>
          </div>
        ))}
      </>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseModal}>
      Fechar
    </Button>
  </Modal.Footer>
</Modal>

      </Container>
    </>
  );
}

export default ListaInspecoes;
