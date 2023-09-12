import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaTrash, FaSearch, FaEdit } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../../services/services';

function ListagemColaborador(props) {
  const { dataset, AtualizarTabela, searchValue, datasetFuncao } = props;

  const [showModal, setShowModal] = useState(false);
  const [selectedColaborador, setSelectedColaborador] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCargoId, setSelectedCargoId] = useState('');


  async function  openModal(colaborador){
    setSelectedColaborador(colaborador);
    setSelectedCargoId(colaborador.cargo._id)
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };


  async function  handleDeleteColaborador (Item){
    try {
      await api.delete(`/colaboradores/${Item._id}`);
      AtualizarTabela(true);
      toast.success('Colaborador removido com sucesso.');
    } catch (error) {
      console.error('Erro ao remover colaborador:', error);
      toast.error('Erro ao remover colaborador.');
    }
  };


  async function handleSaveChanges(){
    try {
      const updatedColaborador = { ...selectedColaborador, cargo: selectedCargoId };
      await api.put(`/colaboradores/${selectedColaborador._id}`, updatedColaborador);
      setShowModal(false);
      AtualizarTabela(true);
      toast.success('Alterações salvas com sucesso.');
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
      toast.error('Erro ao salvar alterações.');
    }
  };
  useEffect(() => {
    setSearchTerm(searchValue);
  }, [searchValue, datasetFuncao]);

  const filteredColaboradores = dataset?.data?.colaborador?.filter((item) =>
    (item.nome && item.nome.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (typeof item.matricula === 'number' && item.matricula.toString().includes(searchTerm))
  );


  
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Matrícula</th>
            <th>Cargo</th>
            <th>Excluir</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {filteredColaboradores?.length > 0 ? (
            filteredColaboradores.map((Item) => (
              <tr key={Item._id}>
                <td>{Item.nome ? Item.nome : ''}</td>
                <td>{Item.matricula ? Item.matricula : ''}</td>
                <td>{Item.cargo.nome === null ? 'Sem cargo' : Item.cargo.nome}</td>
                <td align="center">
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteColaborador(Item)}
                  >
                    <FaTrash />
                  </Button>
                </td>
                <td align="center">
                  <Button
                    variant="secondary"
                    onClick={() => openModal(Item)}
                  >
                    <FaEdit />
                  </Button>
                </td>
              </tr>
            ))
          ) : []}
        </tbody>
      </Table>
      <ToastContainer autoClose={2000} position={toast.POSITION.BOTTOM_LEFT} />
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Colaborador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedColaborador ? (
            <form>
              <div className="mb-3">
                <label htmlFor="colaboradorNome" className="form-label">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="colaboradorNome"
                  value={selectedColaborador.nome || ''}
                  onChange={(e) => setSelectedColaborador(prevState => ({ ...prevState, nome: e.target.value }))}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="colaboradorEmail" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="colaboradorEmail"
                  value={selectedColaborador.email || ''}
                  onChange={(e) => setSelectedColaborador(prevState => ({ ...prevState, email: e.target.value }))}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="colaboradorCargo" className="form-label">Cargo</label>
                <select
                  className="form-select"
                  id="colaboradorCargo"
                  value={selectedCargoId === null ? "Sem Cargo" : selectedCargoId}
                  onChange={(e) => setSelectedCargoId(e.target.value)}
                >
                  <option value="">Selecione um cargo</option>
                  {datasetFuncao?.map((funcao) => (
                    <option key={funcao._id} value={funcao._id}>
                      {funcao.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="colaboradorTelefone" className="form-label">Telefone</label>
                <input
                  type="text"
                  className="form-control"
                  id="colaboradorTelefone"
                  value={selectedColaborador.telefone || ''}
                  onChange={(e) => setSelectedColaborador(prevState => ({ ...prevState, telefone: e.target.value }))}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="colaboradorAtivo" className="form-label">Ativo</label>
                <select
                  className="form-control"
                  id="colaboradorAtivo"
                  value={selectedColaborador.ativo || 'true'}
                  onChange={(e) => setSelectedColaborador(prevState => ({ ...prevState, ativo: e.target.value }))}
                >
                  <option value="true">Ativo</option>
                  <option value="false">Inativo</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="colaboradorEnderecoCidade" className="form-label">Cidade</label>
                <input
                  type="text"
                  className="form-control"
                  id="colaboradorEnderecoCidade"
                  value={(selectedColaborador.endereco && selectedColaborador.endereco.cidade) || ''}
                  onChange={(e) => setSelectedColaborador(prevState => ({ ...prevState, endereco: { ...prevState.endereco, cidade: e.target.value } }))}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="colaboradorEnderecoEstado" className="form-label">Estado</label>
                <input
                  type="text"
                  className="form-control"
                  id="colaboradorEnderecoEstado"
                  value={(selectedColaborador.endereco && selectedColaborador.endereco.estado) || ''}
                  onChange={(e) => setSelectedColaborador(prevState => ({ ...prevState, endereco: { ...prevState.endereco, estado: e.target.value } }))}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="colaboradorEnderecoPolo" className="form-label">Polo</label>
                <input
                  type="text"
                  className="form-control"
                  id="colaboradorEnderecoPolo"
                  value={(selectedColaborador.endereco && selectedColaborador.endereco.polo) || ''}
                  onChange={(e) => setSelectedColaborador(prevState => ({ ...prevState, endereco: { ...prevState.endereco, polo: e.target.value } }))}
                />
              </div>
            </form>
          ) : (
            <p>Carregando...</p>
          )}
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
    </>
  );
}

export default ListagemColaborador;