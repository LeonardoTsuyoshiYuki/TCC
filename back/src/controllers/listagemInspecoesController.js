const mongoose = require("mongoose");
const ListagemInspecoes = mongoose.model('ListagemInspecoes');
const Inspecao = mongoose.model('Inspecao');

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
      const { page, id } = req.query;
      const pageNumber = parseInt(page, 10) || 1;
      const pageSize = 15;
  
      // Criar um objeto de filtro com base no ID, se estiver presente na consulta
      const filter = id ? { _id: id } : {};
  
      let listagemInspecoesPaginadas = await ListagemInspecoes.paginate(filter, {
        page: pageNumber,
        limit: pageSize,
        populate: {
          path: 'inspecoes.inspecao.colaborador',
          model: 'User', 
          select: 'nome', 
        },
      });

      // Verificar se não há resultados para o ID fornecido
      if (id && listagemInspecoesPaginadas.docs.length === 0) {
        return resp.status(404).json({ message: "Nenhuma inspeção encontrada para o ID fornecido." });
      }
  
      // Retornar os resultados
      return resp.status(200).json(listagemInspecoesPaginadas);
    } catch (error) {
      console.error("Erro ao listar Listagem de Inspeções:", error);
      return resp.status(500).json({ message: "Erro interno ao listar Listagem de Inspeções." });
    }
  },
  
  async details(req, resp) {
    try {
      const { id } = req.params;
      const listagemInspecoes = await ListagemInspecoes.findById(id)
        .populate({
          path: 'inspecoes',
          populate: {
            path: 'inspecao', // Populate the 'inspecao' field within 'inspecoes'
          },
        });

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
  async deleteInspecao(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const { listagemId, inspecaoId } = req.params;
  
      const listagem = await ListagemInspecoes.findById(listagemId).session(session);
      if (!listagem) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ message: 'Listagem de Inspeções não encontrada.' });
      }
  
      const inspecao = listagem.inspecoes.find(insp => insp._id.toString() === inspecaoId);
      if (!inspecao) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ message: 'Inspeção não encontrada na Listagem.' });
      }
  
      listagem.inspecoes = listagem.inspecoes.filter(insp => insp._id.toString() !== inspecaoId);
      await listagem.save();
  
      // Agora, remova a inspeção da tabela Inspecao
      const deletedInspecao = await Inspecao.findByIdAndRemove(inspecaoId).session(session);
  
      if (!deletedInspecao) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ message: 'Erro ao deletar Inspeção da Listagem.' });
      }
  
      await session.commitTransaction();
      session.endSession();
  
      return res.status(200).json(listagem);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error('Erro ao deletar Inspeção da Listagem:', error);
      return res.status(500).json({ message: 'Erro interno ao deletar Inspeção da Listagem.' });
    }
  },
  

  async deleteListagemInspecoes(req, resp) {
    try {
      const { id } = req.params;
  
      // Encontre a ListagemInspecoes pelo ID
      const deletedListagemInspecoes = await ListagemInspecoes.findByIdAndRemove(id);
  
      if (!deletedListagemInspecoes) {
        return resp.status(404).json({ message: "Listagem de Inspeções não encontrada." });
      }
  
      // Encontre e exclua todas as Inspecao associadas
      await Inspecao.deleteMany({ listagemInspecoes: id });
  
      return resp.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar Listagem de Inspeções:", error);
      return resp.status(500).json({ message: "Erro interno ao deletar Listagem de Inspeções." });
    }
  }
};
