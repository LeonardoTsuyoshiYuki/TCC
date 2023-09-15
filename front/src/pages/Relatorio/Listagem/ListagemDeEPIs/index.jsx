// import React, { useEffect, useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import { Table, Modal, Container } from 'react-bootstrap';
// import 'react-toastify/dist/ReactToastify.css';
// import api from '../../../services/services';
// import { useLocation } from 'react-router-dom';

// function EpiTable({ epis}) {
//   return (
//     <Table striped bordered hover>
//       <thead>
//         <tr>
//           <th>Nome</th>
//           {/* ... restante do código ... */}
//           <th>Excluir</th>
//           <th>Editar</th>
//         </tr>
//       </thead>
//       <tbody>
//         {epis.map((epiItem) => (
//           <tr key={epiItem._id}>

//           </tr>
//         ))}
//       </tbody>
//     </Table>
//   );
// }

// function EditModal({ epi, onClose }) {
//   return (
//     <Modal show={epi !== null} onHide={onClose}>

//     </Modal>
//   );
// }

// function DeleteConfirmationModal({ show, onCancel }) {
//   return (
//     <Modal show={show} onHide={onCancel}>

//     </Modal>
//   );
// }

// function ListaEPI() {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const matricula = searchParams.get('matricula');

//   const [listaEpis, setListaEpis] = useState([]);
//   const [selectedEPI, setSelectedEPI] = useState(null);

//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
//   const [deletingEPIId, setDeletingEPIId] = useState('');
//   const [deletingEPIName, setDeletingEPIName] = useState('');

//   async function fetchData() {
//     try {
//       const response = await api.get(`/listaEpi?matricula=${matricula}`);
//       setListaEpis(response.data.docs);
//     } catch (error) {
//       toast.error('Erro ao buscar os EPIs.');
//     }
//   }

//   useEffect(() => {
//     fetchData();
//   }, [matricula]);

//   async function handleDeleteEPI(id, nome) {
//     setDeletingEPIId(id);
//     setDeletingEPIName(nome);
//     setShowDeleteConfirmation(true);
//   }

//   async function confirmDeleteEPI() {
//     try {
//       await api.delete(`/listaEpi/${deletingEPIId}`);
//       toast.success(`EPI "${deletingEPIName}" excluído com sucesso.`);
//       fetchData();
//       hideDeleteConfirmModal();
//     } catch (error) {
//       toast.error('Erro ao excluir o EPI.');
//     }
//   }

//   function hideDeleteConfirmModal() {
//     setDeletingEPIId('');
//     setDeletingEPIName('');
//     setShowDeleteConfirmation(false);
//   }

//   function openModal(epiItem) {
//     setSelectedEPI({ ...epiItem });
//   }

//   function closeModal() {
//     setSelectedEPI(null);
//   }

//   async function handleSaveChanges() {
//     try {
//       const response = await api.put(`/listaEpi/${selectedEPI._id}`, selectedEPI);

//       if (response.status === 200) {
//         toast.success('Alterações salvas com sucesso.');
//         fetchData();
//         closeModal();
//       } else {
//         toast.error('Erro ao salvar as alterações.');
//       }
//     } catch (error) {
//       console.error('Erro ao salvar as alterações:', error);
//       toast.error('Erro ao salvar as alterações.');
//     }
//   }

//   return (
//     <>
//       <Container className="d-flex align-items-center justify-content-center">
//         <div className="text-center">
//           <h1 style={{ color: 'white' }}>RELATÓRIO</h1>
//           <br />
//           <EpiTable
//             epis={listaEpis}
//             onDelete={(id, nome) => handleDeleteEPI(id, nome)}
//             onEdit={(epiItem) => openModal(epiItem)}
//           />
//           <ToastContainer autoClose={2000} position={toast.POSITION.BOTTOM_LEFT} />
//           <EditModal epi={selectedEPI} onSave={handleSaveChanges} onClose={closeModal} />
//           <DeleteConfirmationModal
//             epiName={deletingEPIName}
//             show={showDeleteConfirmation}
//             onConfirm={confirmDeleteEPI}
//             onCancel={hideDeleteConfirmModal}
//           />
//         </div>
//       </Container>
//     </>
//   );
// }

// export default ListaEPI;
