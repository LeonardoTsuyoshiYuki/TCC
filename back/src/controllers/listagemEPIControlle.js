const ListaEpi = require('../models/listagemDeEPI');
const { ITENS_POR_PAGINA } = require('../../config');
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  NO_CONTENT: 204,
};

async function handleServerError(resp, message, error) {
  console.error(`${message}: ${error.message}`);
  return resp.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error.' });
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
      const page = parseInt(req.query.page, 10) || 1; // Corrigido para page
      const id = req.query._id;
  
      let consulta = {};
      if (id) {
        consulta._id = id;
      }
  
      const opcoes = {
        page: page, // Corrigido para page
        limit: ITENS_POR_PAGINA,
        populate: { path: 'produtos.produto', select: 'nome codigoCA validadeCA fabricacao' },
      };
  
      const resultadoPaginado = await ListaEpi.paginate(consulta, opcoes);
      return resp.status(HTTP_STATUS.OK).json(resultadoPaginado);
    } catch (error) {
      return handleServerError(resp, 'Erro ao listar Lista de EPIs', error);
    }
  },

  async adicionarProdutosListaEpi(req, resp) {
    try {
      const { id } = req.params;  // Extract id from URL
      const { produtos } = req.body;  // Extract products from request body
  
      const listaEpi = await ListaEpi.findById(id);
  
      if (!listaEpi) {
        return resp.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Lista de EPI não encontrada.' });
      }
  
      // Assuming produtos is an array of product objects
      listaEpi.produtos.push(...produtos);
  
      // Save the updated EPI list
      await listaEpi.save();
  
      console.log('Produtos adicionados à ListaEpi com sucesso:', listaEpi);
      return resp.status(HTTP_STATUS.OK).json(listaEpi);
    } catch (error) {
      return handleServerError(resp, 'Erro ao adicionar produtos à ListaEpi', error);
    }
  },

  async deleteListaEpi(req, resp) {
    try {
      const { id } = req.params;
      const deletedListaEpi = await ListaEpi.findByIdAndRemove(id);
      if (!deletedListaEpi) {
        return resp.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Listagem de EPI não encontrada.' });
      }
      return resp.status(HTTP_STATUS.NO_CONTENT).send();
    } catch (error) {
      return handleServerError(resp, 'Erro ao deletar Listagem de EPI', error);
    }
  },
};
