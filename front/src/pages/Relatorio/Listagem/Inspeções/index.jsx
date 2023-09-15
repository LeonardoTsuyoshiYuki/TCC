import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { Table, Button, Modal, Container } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../services/services";
import Header from "../../../components/Header";

function ListaInspecoes() {
  const [listaInspecoes, setListaInspecoes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedInspecao, setSelectedInspecao] = useState({
    _id: "",
    pergunta: "",
    descricao: "",
    tipoResposta: "",
    data: "",
    perguntas: [], // Adicione as perguntas e respostas aqui
  });

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deletingInspecaoId, setDeletingInspecaoId] = useState("");
  const [deletingInspecaoName, setDeletingInspecaoName] = useState("");

  async function handleDeleteInspecao(id, pergunta) {
    setDeletingInspecaoId(id);
    setDeletingInspecaoName(pergunta);
    setShowDeleteConfirmation(true);
  }

  async function confirmDeleteInspecao() {
    try {
      await api.delete(`/inspecao/${deletingInspecaoId}`);
      toast.success(`Inspeção com pergunta "${deletingInspecaoName}" excluída com sucesso.`);
      BuscarListaInspecoes();
      hideDeleteConfirmModal();
    } catch (error) {
      toast.error("Erro ao excluir a inspeção.");
    }
  }

  function hideDeleteConfirmModal() {
    setDeletingInspecaoId("");
    setDeletingInspecaoName("");
    setShowDeleteConfirmation(false);
  }

  function openModal(inspecaoItem) {
    setSelectedInspecao({ ...inspecaoItem });
    setShowModal(true);
  }

  function closeModal() {
    setSelectedInspecao({
      pergunta: "",
      descricao: "",
      tipoResposta: "",
      data: "",
      perguntas: [],
    });
    setShowModal(false);
  }

  async function BuscarListaInspecoes() {
    try {
      const response = await api.get(`/inspecao`);
      setListaInspecoes(response.data.docs);
    } catch (error) {
      toast.error("Erro ao buscar as inspeções.");
    }
  }

  async function handleSaveChanges() {
    try {
      const response = await api.put(`/inspecao/${selectedInspecao._id}`, selectedInspecao);

      if (response.status === 200) {
        toast.success("Alterações salvas com sucesso.");
        BuscarListaInspecoes();
        closeModal();
      } else {
        toast.error("Erro ao salvar as alterações.");
      }
    } catch (error) {
      console.error("Erro ao salvar as alterações:", error);
      toast.error("Erro ao salvar as alterações.");
    }
  }

  useEffect(() => {
    BuscarListaInspecoes();
  }, []);

  return (
    <>
      <Header />
      <Container className="d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h1 style={{ color: "white" }}>Lista de Inspeções</h1>
          <br />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Pergunta</th>
                <th>Descrição</th>
                <th>Tipo de Resposta</th>
                <th>Data</th>
                <th>Excluir</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {listaInspecoes.map((inspecaoItem) => (
                <tr key={inspecaoItem._id}>
                  <td>{inspecaoItem.pergunta}</td>
                  <td>{inspecaoItem.descricao}</td>
                  <td>{inspecaoItem.tipoResposta}</td>
                  <td>{inspecaoItem.data}</td>
                  <td align="center">
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteInspecao(inspecaoItem._id, inspecaoItem.pergunta)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                  <td align="center">
                    <Button
                      variant="secondary"
                      onClick={() => openModal(inspecaoItem)}
                    >
                      <FaEdit />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <ToastContainer
            autoClose={2000}
            position={toast.POSITION.BOTTOM_LEFT}
          />
          <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Inspeção</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="mb-3">
                  <label htmlFor="pergunta" className="form-label">
                    Pergunta
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="pergunta"
                    value={selectedInspecao.pergunta}
                    onChange={(e) =>
                      setSelectedInspecao({ ...selectedInspecao, pergunta: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="descricao" className="form-label">
                    Descrição
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="descricao"
                    value={selectedInspecao.descricao}
                    onChange={(e) =>
                      setSelectedInspecao({ ...selectedInspecao, descricao: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tipoResposta" className="form-label">
                    Tipo de Resposta
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tipoResposta"
                    value={selectedInspecao.tipoResposta}
                    onChange={(e) =>
                      setSelectedInspecao({ ...selectedInspecao, tipoResposta: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="data" className="form-label">
                    Data
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="data"
                    value={selectedInspecao.data}
                    onChange={(e) =>
                      setSelectedInspecao({ ...selectedInspecao, data: e.target.value })
                    }
                  />
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Fechar
              </Button>
              <Button variant="primary" onClick={handleSaveChanges}>
                Salvar Alterações
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showDeleteConfirmation} onHide={hideDeleteConfirmModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmar Exclusão</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Tem certeza de que deseja excluir esta inspeção "{deletingInspecaoName}"?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={hideDeleteConfirmModal}>
                Cancelar
              </Button>
              <Button variant="danger" onClick={confirmDeleteInspecao}>
                Excluir
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Container>
    </>
  );
}

export default ListaInspecoes;
