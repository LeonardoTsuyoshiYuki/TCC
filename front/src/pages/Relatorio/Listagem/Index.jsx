import React from 'react';
import Header from '../../../components/Header';
import { useLocation } from 'react-router-dom';

function Listagem() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const matricula = queryParams.get('matricula');
  const opcao = queryParams.get('opcao');

  return (
    <div>
      <Header />
      <h2>Matrícula: {matricula}</h2>
      <h2>Opção: {opcao}</h2>
      {/* Adicione o conteúdo da listagem aqui */}
    </div>
  );
}

export default Listagem;
