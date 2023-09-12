import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { Table, Button, Modal, Form, Container } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import api from "../../../services/services";
import Header from '../../../components/Header';



function ListaEPI(props) {
  const [listaEpis, setListaEpis] = useState();
  console.log('************listaEpis', listaEpis)
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

    async function handleDeleteEPI(id) {
      try {
        await api.delete(`/listaEpi/${id}`);
        toast.success("EPI excluído com sucesso.");
        BuscalistaEpis();
      } catch (error) {
        toast.error("Erro ao excluir o EPI.");
      }
    };

    function openModal(epiItem){
      setSelectedEPI(epiItem);
      setShowModal(true);
    };

    function closeModal(){
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

  async function BuscalistaEpis() {
    try {
      const retorno = await api.get('/listaEpi');
      setListaEpis(retorno);

    } catch (error) {
      toast.error("Erro ao buscar os EPIs.");
    }
  };

    const handleSaveChanges = async () => {
      try {
        const retorno = await api.put(`/listaEpi/${selectedEPI._id}`, {
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

        if (retorno.status === 200) {
          toast.success("Alterações salvas com sucesso.");
          BuscalistaEpis();
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
    BuscalistaEpis()
  }, [])

  return (
    <>
      <Header />
      <Container>


        <Table striped bordered hover>
          <thead>
            s<tr>
              <th>Quantidade</th>
              <th>Entrega</th>
              <th>Devolução</th>
              <th>Visto de Entrega</th>
              <th>Visto de Devolução</th>
              <th>Nome</th>
              <th>Código CA</th>
              <th>Validade CA</th>
              <th>Fabricação</th>
              <th>Excluir</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {listaEpis?.data?.docs?.length > 0 ? listaEpis.data.docs.map((epiItem) => (
              <tr key={epiItem._id}>
                <td>{epiItem.quantidade}</td>
                <td>{epiItem.entrega}</td>
                <td>{epiItem.devolucao}</td>
                <td>{epiItem.vistoEntrega}</td>
                <td>{epiItem.vistoDevolucao}</td>
                <td>{epiItem.nome}</td>
                <td>{epiItem.codigoCA}</td>
                <td>{epiItem.validadeCA}</td>
                <td>{epiItem.fabricacao}</td>
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
            )) : []}
          </tbody>
        </Table>
        <ToastContainer autoClose={2000} position={toast.POSITION.BOTTOM_LEFT} />
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Editar EPI</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formQuantidade">
                <Form.Label>Quantidade</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Quantidade de EPIs"
                  value={selectedEPI.quantidade}
                  onChange={(e) =>
                    setSelectedEPI({
                      ...selectedEPI,
                      quantidade: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEntrega">
                <Form.Label>Entrega</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedEPI.entrega}
                  onChange={(e) =>
                    setSelectedEPI({
                      ...selectedEPI,
                      entrega: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>
              <Form.Group controlId="formDevolucao">
                <Form.Label>Devolução</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedEPI.devolucao}
                  onChange={(e) =>
                    setSelectedEPI({
                      ...selectedEPI,
                      devolucao: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formVistoEntrega">
                <Form.Label>Visto de Entrega</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Visto de Entrega"
                  value={selectedEPI.vistoEntrega}
                  onChange={(e) =>
                    setSelectedEPI({
                      ...selectedEPI,
                      vistoEntrega: e.target.value,
                    })
                  }
                  required
                  maxLength={200}
                />
              </Form.Group>
              <Form.Group controlId="formVistoDevolucao">
                <Form.Label>Visto de Devolução</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Visto de Devolução"
                  value={selectedEPI.vistoDevolucao}
                  onChange={(e) =>
                    setSelectedEPI({
                      ...selectedEPI,
                      vistoDevolucao: e.target.value,
                    })
                  }
                  maxLength={200}
                />
              </Form.Group>
              <Form.Group controlId="formNome">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nome do EPI"
                  value={selectedEPI.nome}
                  onChange={(e) =>
                    setSelectedEPI({
                      ...selectedEPI,
                      nome: e.target.value,
                    })
                  }
                  required
                  maxLength={200}
                />
              </Form.Group>
              <Form.Group controlId="formCodigoCA">
                <Form.Label>Código CA</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Código CA"
                  value={selectedEPI.codigoCA}
                  onChange={(e) =>
                    setSelectedEPI({
                      ...selectedEPI,
                      codigoCA: e.target.value,
                    })
                  }
                  required
                  minLength={10}
                  unique
                />
              </Form.Group>
              <Form.Group controlId="formValidadeCA">
                <Form.Label>Validade CA</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedEPI.validadeCA}
                  onChange={(e) =>
                    setSelectedEPI({
                      ...selectedEPI,
                      validadeCA: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>
              <Form.Group controlId="formFabricacao">
                <Form.Label>Fabricação</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedEPI.fabricacao}
                  onChange={(e) =>
                    setSelectedEPI({
                      ...selectedEPI,
                      fabricacao: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>
            </Form>
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
      </Container>
    </>
  );
}

export default ListaEPI;
