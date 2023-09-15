const mongoose = require("mongoose");
const Pergunta = mongoose.model('Pergunta');
const { validationResult } = require('express-validator');
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  NO_CONTENT: 204,
};
module.exports = {
  async listPergunta(req, res) {
    try {
      const perguntas = await Pergunta.find({});
      return res.status(HTTP_STATUS.OK).json(perguntas);
    } catch (error) {
      console.error("Erro ao listar Perguntas:", error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Erro interno ao listar Perguntas." });
    }
  },

  async updatePergunta(req, res) {
    try {
      const { id } = req.params;
      const updatedPergunta = await Pergunta.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedPergunta) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Pergunta não encontrada." });
      }

      console.log("Pergunta atualizada com sucesso:", updatedPergunta);
      return res.status(HTTP_STATUS.OK).json(updatedPergunta);
    } catch (error) {
      console.error("Erro ao atualizar Pergunta:", error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Erro interno ao atualizar Pergunta." });
    }
  },

  async deletePergunta(req, res) {
    try {
      const { id } = req.params;
      const deletedPergunta = await Pergunta.findByIdAndRemove(id);

      if (!deletedPergunta) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Pergunta não encontrada." });
      }

      console.log("Pergunta deletada com sucesso.");
      return res.status(HTTP_STATUS.NO_CONTENT).send();
    } catch (error) {
      console.error("Erro ao deletar Pergunta:", error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Erro interno ao deletar Pergunta." });
    }
  },

  async insertPergunta(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
      }

      const novaPergunta = await Pergunta.create(req.body);
      console.log("Pergunta cadastrada com sucesso:", novaPergunta);
      return res.status(HTTP_STATUS.CREATED).json(novaPergunta);
    } catch (error) {
      console.error("Erro ao cadastrar Pergunta:", error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Erro interno ao cadastrar Pergunta." });
    }
  }
};
