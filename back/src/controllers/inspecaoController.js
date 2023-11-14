const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const Inspecao = mongoose.model('Inspecao');
const ListagemInspecoes = mongoose.model('ListagemInspecoes');
const Pergunta = mongoose.model('Pergunta')
const Colaborador = mongoose.model('User'); // Adicionei o modelo de Colaborador

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  NO_CONTENT: 204,
};

// Função de tratamento de erro genérica
function handleServerError(resp, errorMessage, error) {
  console.error(errorMessage, error);
  resp.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: errorMessage });
}

module.exports = {
  async insertInspecao(req, resp) {
    try {
      const novaInspecao = await Inspecao.create(req.body);

      const listagemInspecoesId = req.params.id;

      if (!listagemInspecoesId) {
        return resp.status(HTTP_STATUS.BAD_REQUEST).json({ message: "O ID da Listagem de Inspeções é obrigatório." });
      }

      const listagemInspecoes = await ListagemInspecoes.findById(listagemInspecoesId);

      if (!listagemInspecoes) {
        return resp.status(HTTP_STATUS.NOT_FOUND).json({ message: "Listagem de Inspeções não encontrada." });
      }

      listagemInspecoes.inspecoes.push(novaInspecao);
      await listagemInspecoes.save();

      console.log("Inspeção cadastrada com sucesso:", novaInspecao);

      return resp.status(HTTP_STATUS.CREATED).json(novaInspecao);
    } catch (error) {
      console.error("Erro ao cadastrar Inspeção:", error);
      return resp.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Erro interno ao cadastrar Inspeção." });
    }
  },

  async listInspecao(req, resp) {
    try {
      const id = req.query.id;
      let consulta = {};
    
      if (id) {
        consulta._id = id;
      }
    
      const options = {
        populate: [
          {
            path: 'perguntas.pergunta',
            model: 'Pergunta',
            select: 'pergunta',
          },
          {
            path: 'colaborador', 
            model: 'User', 
            select: 'nome', 
          },
        ],
      };
    
      const resultadoPaginado = await Inspecao.paginate(consulta, options);
      return resp.status(HTTP_STATUS.OK).json(resultadoPaginado);
    } catch (error) {
      return handleServerError(resp, 'Erro ao listar Inspeções', error);
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
        perguntas: perguntas.map((pergunta, index) => ({ pergunta, resposta: respostas[index] })),
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
