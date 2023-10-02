const mongoose = require('mongoose');
const ListaEpi = require('../models/listagemDeEPI'); 

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  NO_CONTENT: 204,
};

const ITENS_POR_PAGINA = 15;

const handleServerError = (resp, message, error) => {
  console.error(`${message}: ${error.message}`);
  return resp.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Erro interno do servidor.' });
};

async function tratarErroServidor(resp, mensagem, erro) {
  console.error('Erro:', erro);
  return resp.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ mensagem: mensagem, erro: erro.message });
}

module.exports = {
  async insertListaEpi(req, resp) {
    try {
      const { produtos, ...listaEpiData } = req.body;

      const produtosWithDetails = produtos.map(prod => ({
        produto: prod._id,
        quantidade: prod.quantidade,
        entrega: listaEpiData.entrega,
        vistoEntrega: listaEpiData.vistoEntrega,
      }));

      listaEpiData.produtos = produtosWithDetails;

      const novaListaEpi = await ListaEpi.create(listaEpiData);

      console.log('ListaEpi cadastrada com sucesso:', novaListaEpi);
      return resp.status(HTTP_STATUS.CREATED).json(novaListaEpi);
    } catch (error) {
      return handleServerError(resp, 'Erro ao cadastrar Listagem de Epi', error);
    }
  },

  async listListaEpi(req, resp) {
    try {
      const pagina = parseInt(req.query.pagina, 10) || 1;
      const id = req.query._id;

      let consulta = {};
      if (id) {
        consulta._id = id;
      }

      const opcoes = {
        page: pagina,
        limit: ITENS_POR_PAGINA,
        populate: { path: 'produtos.produto', select: 'nome codigoCA validadeCA fabricacao' },
      };

      const resultadoPaginado = await ListaEpi.paginate(consulta, opcoes);
      return resp.status(HTTP_STATUS.OK).json(resultadoPaginado);
    } catch (error) {
      return tratarErroServidor(resp, 'Erro ao listar Lista de EPIs', error);
    }
  },
  

  async updateListaEpi(req, resp) {
    try {
      const { id } = req.params;
      const updatedListaEpi = await ListaEpi.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedListaEpi) {
        return resp.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Listagem de EPI não encontrado.' });
      }
      return resp.status(HTTP_STATUS.OK).json(updatedListaEpi);
    } catch (error) {
      return handleServerError(resp, 'Erro ao atualizar ListaEpi', error);
    }
  },

  async deleteListaEpi(req, resp) {
    try {
      const { id } = req.params;
      const deletedListaEpi = await ListaEpi.findByIdAndRemove(id);
      if (!deletedListaEpi) {
        return resp.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Listagem de EPI não encontrado.' });
      }
      return resp.status(HTTP_STATUS.NO_CONTENT).send();
    } catch (error) {
      return handleServerError(resp, 'Erro ao deletar Listagem de EPI', error);
    }
  },
};
