const mongoose = require("mongoose");
const Inspecoes = mongoose.model('Inspecoes');

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  NO_CONTENT: 204,
};

module.exports = {
  async insertInspecao(req, resp) {
    try {
      const novaInspecao = await Inspecoes.create(req.body);
      console.log("Inspeção cadastrada com sucesso:", novaInspecao);
      return resp.status(HTTP_STATUS.CREATED).json(novaInspecao);
    } catch (error) {
      console.error("Erro ao cadastrar Inspeção:", error);
      return resp.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Erro interno ao cadastrar Inspeção." });
    }
  },

  async listInspecao(req, resp) {
    try {
      const { page } = req.query;
      const pageNumber = parseInt(page, 10) || 1;
      const pageSize = 15;

      const options = {
        page: pageNumber,
        limit: pageSize,
      };

      const inspecoesPaginadas = await Inspecoes.paginate({}, options);
      return resp.status(HTTP_STATUS.OK).json(inspecoesPaginadas);
    } catch (error) {
      console.error("Erro ao listar Inspeções:", error);
      return resp.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Erro interno ao listar Inspeções." });
    }
  },

  async details(req, resp) {
    try {
      const { id } = req.params;
      const inspecao = await Inspecoes.findById(id);

      if (!inspecao) {
        return resp.status(HTTP_STATUS.NOT_FOUND).json({ message: "Inspeção não encontrada." });
      }

      return resp.status(HTTP_STATUS.OK).json(inspecao);
    } catch (error) {
      console.error("Erro ao buscar detalhes da Inspeção:", error);
      return resp.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Erro interno ao buscar detalhes da Inspeção." });
    }
  },

  async updateInspecao(req, resp) {
    try {
      const { id } = req.params;
      const updatedInspecao = await Inspecoes.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedInspecao) {
        return resp.status(HTTP_STATUS.NOT_FOUND).json({ message: "Inspeção não encontrada." });
      }

      return resp.status(HTTP_STATUS.OK).json(updatedInspecao);
    } catch (error) {
      console.error("Erro ao atualizar Inspeção:", error);
      return resp.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Erro interno ao atualizar Inspeção." });
    }
  },

  async deleteInspecao(req, resp) {
    try {
      const { id } = req.params;
      const deletedInspecao = await Inspecoes.findByIdAndRemove(id);

      if (!deletedInspecao) {
        return resp.status(HTTP_STATUS.NOT_FOUND).json({ message: "Inspeção não encontrada." });
      }

      return resp.status(HTTP_STATUS.NO_CONTENT).send();
    } catch (error) {
      console.error("Erro ao deletar Inspeção:", error);
      return resp.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Erro interno ao deletar Inspeção." });
    }
  }
};
