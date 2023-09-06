const mongoose = require("mongoose");
const Produto = mongoose.model('Produto');
const moment = require('moment');

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  NO_CONTENT: 204,
};

module.exports = {
    async insertProduto(req, resp) {
        try {
            const novoProduto = await Produto.create(req.body);
    
            console.log("Produto cadastrado com sucesso:", novoProduto);
            return resp.status(201).json(novoProduto);
        } catch (error) {
            console.error("Erro ao cadastrar Produto:", error);
            return resp.status(500).json({ message: "Erro interno ao cadastrar Produto." });
        }
    },
    
  async listProduto(req, resp) {
    try {
      const { page } = req.query;
      const pageNumber = parseInt(page, 10) || 1;
      const pageSize = 15;

      const options = {
        page: pageNumber,
        limit: pageSize,
      };

      const produtosPaginados = await Produto.paginate({}, options);
      return resp.status(HTTP_STATUS.OK).json(produtosPaginados);
    } catch (error) {
      console.error("Erro ao listar Produtos:", error);
      return resp.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Erro interno ao listar Produtos." });
    }
  },

  async details(req, resp) {
    try {
      const { id } = req.params;
      const produto = await Produto.findById(id);

      if (!produto) {
        return resp.status(HTTP_STATUS.NOT_FOUND).json({ message: "Produto não encontrado." });
      }

      return resp.status(HTTP_STATUS.OK).json(produto);
    } catch (error) {
      console.error("Erro ao buscar detalhes do Produto:", error);
      return resp.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Erro interno ao buscar detalhes do Produto." });
    }
  },

  async updateProduto(req, resp) {
    try {
      const { id } = req.params;
      const updatedProduto = await Produto.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedProduto) {
        return resp.status(HTTP_STATUS.NOT_FOUND).json({ message: "Produto não encontrado." });
      }

      return resp.status(HTTP_STATUS.OK).json(updatedProduto);
    } catch (error) {
      console.error("Erro ao atualizar Produto:", error);
      return resp.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Erro interno ao atualizar Produto." });
    }
  },

  async deleteProduto(req, resp) {
    try {
      const { id } = req.params;
      const deletedProduto = await Produto.findByIdAndRemove(id);

      if (!deletedProduto) {
        return resp.status(HTTP_STATUS.NOT_FOUND).json({ message: "Produto não encontrado." });
      }

      return resp.status(HTTP_STATUS.NO_CONTENT).send();
    } catch (error) {
      console.error("Erro ao deletar Produto:", error);
      return resp.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Erro interno ao deletar Produto." });
    }
  }
}
