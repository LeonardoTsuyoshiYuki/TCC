const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const Inspecao = mongoose.model('Inspecao');
const ListagemInspecoes = mongoose.model('ListagemInspecoes'); // Importe o modelo de ListagemInspecoes

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
      const novaInspecao = await Inspecao.create(req.body);

      // Obtenha o _id da ListagemInspecoes dos parâmetros da URL
      const listagemInspecoesId = req.params.id;

      if (!listagemInspecoesId) {
          return resp.status(HTTP_STATUS.BAD_REQUEST).json({ message: "O ID da Listagem de Inspeções é obrigatório." });
      }

      console.log("************listagemInspecoesId", listagemInspecoesId)

      const listagemInspecoes = await ListagemInspecoes.findById(listagemInspecoesId);

      if (!listagemInspecoes) {
        return resp.status(404).json({ message: "Listagem de Inspeções não encontrada." });
      }

      // Adicione a nova inspeção à listagem de inspeções
      listagemInspecoes.inspecoes.push(novaInspecao);
      await listagemInspecoes.save();

      console.log("Inspeção cadastrada com sucesso:", novaInspecao);

      return resp.status(201).json(novaInspecao);
    } catch (error) {
      console.error("Erro ao cadastrar Inspeção:", error);
      return resp.status(500).json({ message: "Erro interno ao cadastrar Inspeção." });
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
        populate: {
          path: "Inspecao.perguntas.pergunta",
          model: "Pergunta",
          select: "pergunta resposta",
          strictPopulate: false, // Desabilita o modo estrito
        },
      };

      const InspecaoPaginadas = await Inspecao.paginate({}, options);
      return resp.status(HTTP_STATUS.OK).json(InspecaoPaginadas);
    } catch (error) {
      console.error("Erro ao listar Inspeções:", error);
      return resp.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Erro interno ao listar Inspeções." });
    }
  },

  async deleteInspecao(req, resp) {
    try {
      const { id } = req.params;
      const deletedInspecao = await Inspecao.findByIdAndRemove(id);

      if (!deletedInspecao) {
        return resp.status(HTTP_STATUS.NOT_FOUND).json({ message: "Inspeção não encontrada." });
      }

      return resp.status(HTTP_STATUS.NO_CONTENT).send();
    } catch (error) {
      console.error("Erro ao deletar Inspeção:", error);
      return resp.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Erro interno ao deletar Inspeção." });
    }
  },

  async adicionarInspecao(req, resp) {
    try {
      const { colaboradorId } = req.params;
      const { perguntas, respostas, observacoes } = req.body;

      const colaborador = await Colaborador.findById(colaboradorId);

      if (!colaborador) {
        return resp.status(HTTP_STATUS.NOT_FOUND).json({ message: "Colaborador não encontrado." });
      }

      const novaInspecao = {
        perguntas: perguntas,
        respostas: respostas,
        observacoes: observacoes,
      };

      colaborador.Inspecao.push(novaInspecao);
      await colaborador.save();

      return resp.status(HTTP_STATUS.OK).json(colaborador);
    } catch (error) {
      console.error("Erro ao adicionar inspeção ao colaborador:", error);
      return resp.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Erro interno ao adicionar inspeção ao colaborador." });
    }
  }
};
