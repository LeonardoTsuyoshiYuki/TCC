const mongoose = require("mongoose");
const ListaEpi = mongoose.model('ListaEpi');
const moment = require('moment');

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  NO_CONTENT: 204,
};

module.exports = {
    async insertListaEpi(req, resp) {
        try {
            const novoListaEpi = await ListaEpi.create(req.body);
    
            console.log("ListaEpi cadastrado com sucesso:", novoListaEpi);
            return resp.status(201).json(novoListaEpi);
        } catch (error) {
            console.error("Erro ao cadastrar Listagem de Epi:", error);
            return resp.status(500).json({ message: "Erro interno ao cadastrar Listagem de Epi." });
        }
    },
    
    async listListaEpi(req, resp) {
      try {
        const { page } = req.query;
        const pageNumber = parseInt(page, 10) || 1;
        const pageSize = 15;
    
        const options = {
          page: pageNumber,
          limit: pageSize,
          populate: 'produto'
        };
    
        // Use o método populate para carregar os dados do produto associado
        const ListagemListaEpi = await ListaEpi.paginate({}, options);
        
    
        return resp.status(HTTP_STATUS.OK).json(ListagemListaEpi);
      } catch (error) {
        console.error("Erro ao listar Lista de EPIs:", error);
        return resp.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Erro interno ao listar Lista de EPIs." });
      }
    },
    
    async details(req, resp) {
      try {
        const { id } = req.params;
        // Use o método populate para carregar os dados do produto associado
        const ListaEpi = await ListaEpi.findById(id).populate('produto');
    
        if (!ListaEpi) {
          return resp.status(HTTP_STATUS.NOT_FOUND).json({ message: "Listagem de EPI não encontrado." });
        }
    
        return resp.status(HTTP_STATUS.OK).json(ListaEpi);
      } catch (error) {
        console.error("Erro ao buscar detalhes da Listagem de EPI:", error);
        return resp.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Erro interno ao buscar detalhes da Listagem de EPI." });
      }
    },
    

  async updateListaEpi(req, resp) {
    try {
      const { id } = req.params;
      const updatedListaEpi = await ListaEpi.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedListaEpi) {
        return resp.status(HTTP_STATUS.NOT_FOUND).json({ message: "Listagem de EPI não encontrado." });
      }

      return resp.status(HTTP_STATUS.OK).json(updatedListaEpi);
    } catch (error) {
      console.error("Erro ao atualizar ListaEpi:", error);
      return resp.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Erro interno ao atualizar Listagem de EPI." });
    }
  },

  async deleteListaEpi(req, resp) {
    try {
      const { id } = req.params;
      const deletedListaEpi = await ListaEpi.findByIdAndRemove(id);

      if (!deletedListaEpi) {
        return resp.status(HTTP_STATUS.NOT_FOUND).json({ message: "Listagem de EPI não encontrado." });
      }

      return resp.status(HTTP_STATUS.NO_CONTENT).send();
    } catch (error) {
      console.error("Erro ao deletar Listagem de EPI:", error);
      return resp.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Erro interno ao deletar Listagem de EPI." });
    }
  }
}
