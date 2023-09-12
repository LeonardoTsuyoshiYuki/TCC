import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { Table, Button, Modal, Form, Container } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import api from "../../../services/services";
import Header from '../../../components/Header';
import { useLocation } from "react-router-dom";

function ListaEPI(props) {
  const [listaEpis, setListaEpis] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEPI, setSelectedEPI] = useState({
    _id: "",
    quantidade: "",
    entrega: "",
    devolucao: "",
    vistoEntrega: "",
    vistoDevolucao: "",
    nome: "",
    codigoCA: "",
    validadeCA: "",
    fabricacao: "",
  });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const matricula = searchParams.get("matricula");

  async function handleDeleteEPI(id) {
    try {
      await api.delete(`/listaEpi/${id}`);
      toast.success("EPI excluído com sucesso.");
      BuscarListaEpis();
    } catch (error) {
      toast.error("Erro ao excluir o EPI.");
    }
  };

  function openModal(epiItem) {
    setSelectedEPI(epiItem);
    setShowModal(true);
  };

  function closeModal() {
    setSelectedEPI({
      quantidade: "",
      entrega: "",
      devolucao: "",
      vistoEntrega: "",
      vistoDevolucao: "",
      nome: "",
      codigoCA: "",
      validadeCA: "",
      fabricacao: "",
    });
    setShowModal(false);
  };

  async function BuscarListaEpis() {
    try {
      const response = await api.get(`/listaEpi?matricula=${matricula}`);
      setListaEpis(response.data.docs);
    } catch (error) {
      toast.error("Erro ao buscar os EPIs.");
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await api.put(`/listaEpi/${selectedEPI._id}`, {
        quantidade: selectedEPI.quantidade,
        entrega: selectedEPI.entrega,
        devolucao: selectedEPI.devolucao,
        vistoEntrega: selectedEPI.vistoEntrega,
        vistoDevolucao: selectedEPI.vistoDevolucao,
        nome: selectedEPI.nome,
        codigoCA: selectedEPI.codigoCA,
        validadeCA: selectedEPI.validadeCA,
        fabricacao: selectedEPI.fabricacao
      });

      if (response.status === 200) {
        toast.success("Alterações salvas com sucesso.");
        BuscarListaEpis();
        closeModal();
      } else {
        toast.error("Erro ao salvar as alterações.");
      }
    } catch (error) {
      console.error("Erro ao salvar as alterações:", error);
      toast.error("Erro ao salvar as alterações.");
    }
  };

  useEffect(() => {
    BuscarListaEpis();
  }, [matricula]);

  return (
    <>
      <Header />
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Código CA</th>
              <th>Validade CA</th>
              <th>Fabricação</th>
              <th>Entrega</th>
              <th>Visto de Entrega</th>
              <th>Devolução</th>
              <th>Visto de Devolução</th>
              <th>Excluir</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {listaEpis.map((epiItem) => (
              <tr key={epiItem._id}>
                <td>{epiItem.produto.nome}</td>
                <td>{epiItem.quantidade}</td>
                <td>{epiItem.produto.codigoCA}</td>
                <td>{epiItem.produto.validadeCA}</td>
                <td>{epiItem.produto.fabricacao}</td>
                <td>{epiItem.entrega}</td>
                <td>{epiItem.vistoEntrega}</td>
                <td>{epiItem.devolucao}</td>
                <td>{epiItem.vistoDevolucao}</td>
                <td align="center">
                  <Button variant="danger" onClick={() => handleDeleteEPI(epiItem._id)}>
                    <FaTrash />
                  </Button>
                </td>
                <td align="center">
                  <Button variant="secondary" onClick={() => openModal(epiItem)}>
                    <FaEdit />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ToastContainer autoClose={2000} position={toast.POSITION.BOTTOM_LEFT} />
        <Modal show={showModal} onHide={closeModal}>
        </Modal>
      </Container>
    </>
  );
}

export default ListaEPI;
