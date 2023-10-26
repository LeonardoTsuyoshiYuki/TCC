const mongoose = require("mongoose");
const ListagemInspecoes = mongoose.model('ListagemInspecoes');

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  NO_CONTENT: 204,
};

module.exports = {
  async insertListagemInspecoes(req, resp) {
    try {
      const novaListagemInspecoes = await ListagemInspecoes.create(req.body);
      console.log("Listagem de Inspeções cadastrada com sucesso:", novaListagemInspecoes);
      return resp.status(201).json(novaListagemInspecoes);
    } catch (error) {
      console.error("Erro ao cadastrar Listagem de Inspeções:", error);
      return resp.status(500).json({ message: "Erro interno ao cadastrar Listagem de Inspeções." });
    }
  },

  async listListagemInspecoes(req, resp) {
    try {
      const { page } = req.query;
      const pageNumber = parseInt(page, 10) || 1;
      const pageSize = 15;

      const options = {
        page: pageNumber,
        limit: pageSize,
      };

      const listagemInspecoesPaginadas = await ListagemInspecoes.paginate({}, options);
      return resp.status(200).json(listagemInspecoesPaginadas);
    } catch (error) {
      console.error("Erro ao listar Listagem de Inspeções:", error);
      return resp.status(500).json({ message: "Erro interno ao listar Listagem de Inspeções." });
    }
  },

  async details(req, resp) {
    try {
      const { id } = req.params;
      const listagemInspecoes = await ListagemInspecoes.findById(id);

      if (!listagemInspecoes) {
        return resp.status(404).json({ message: "Listagem de Inspeções não encontrada." });
      }

      return resp.status(200).json(listagemInspecoes);
    } catch (error) {
      console.error("Erro ao buscar detalhes da Listagem de Inspeções:", error);
      return resp.status(500).json({ message: "Erro interno ao buscar detalhes da Listagem de Inspeções." });
    }
  },

  async updateListagemInspecoes(req, resp) {
    try {
      const { id } = req.params;
      const updatedListagemInspecoes = await ListagemInspecoes.findByIdAndUpdate(id, { $set: req.body }, { new: true });

      if (!updatedListagemInspecoes) {
        return resp.status(404).json({ message: "Listagem de Inspeções não encontrada." });
      }

      return resp.status(200).json(updatedListagemInspecoes);
    } catch (error) {
      console.error("Erro ao atualizar Listagem de Inspeções:", error);
      return resp.status(500).json({ message: "Erro interno ao atualizar Listagem de Inspeções." });
    }
  },

  async deleteListagemInspecoes(req, resp) {
    try {
      const { id } = req.params;
      const deletedListagemInspecoes = await ListagemInspecoes.findByIdAndRemove(id);

      if (!deletedListagemInspecoes) {
        return resp.status(404).json({ message: "Listagem de Inspeções não encontrada." });
      }

      return resp.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar Listagem de Inspeções:", error);
      return resp.status(500).json({ message: "Erro interno ao deletar Listagem de Inspeções." });
    }
  }
};
