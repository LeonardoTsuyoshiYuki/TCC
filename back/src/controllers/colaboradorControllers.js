const mongoose = require("mongoose")
const Colaborador = mongoose.model('User')


module.exports = {
    async insertColaborador(req, resp) {
        try {
          const novoColaborador = await Colaborador.create(req.body);
      
          console.log("Colaborador cadastrado com sucesso:", novoColaborador);
          return resp.status(201).json(novoColaborador);
        } catch (error) {
          console.error("Erro ao cadastrar colaborador:", error);
          return resp.status(500).json({ message: "Erro interno ao cadastrar colaborador." });
        }
      }
      ,

    async listColaborador(req, resp) {
        try {
            const { page } = req.query;

            // Convertendo a página para um número inteiro
            const pageNumber = parseInt(page, 10) || 1;
            const pageSize = 15;

            const options = {
                page: pageNumber,
                limit: pageSize,
            };

            const colaborador = await Colaborador.paginate({}, options);

            if (!colaborador) {
                return resp.status(404).json({ message: "Nenhum colaborador encontrado." });
            }

            console.log("Colaboradores cadastrados:", colaborador);
            return resp.json(colaborador);
        } catch (error) {
            console.error("Erro ao listar colaboradores:", error);
            return resp.status(500).json({ message: "Erro interno ao listar colaboradores." });
        }
    },
    async details(req, resp) {
        try {
            const colaborador = await Colaborador.findById(req.params.id);

            if (!colaborador) {
                return resp.status(404).json({ message: "Colaborador não encontrado." });
            }

            console.log(`Detalhes do colaborador:`, colaborador);
            return resp.json(colaborador);
        } catch (error) {
            console.error("Erro ao buscar detalhes do colaborador:", error);
            return resp.status(500).json({ message: "Erro interno ao buscar detalhes do colaborador." });
        }
    }
    ,
    async updateColaborador(req, resp) {
        try {
            const colaborador = await Colaborador.findByIdAndUpdate(req.params.id, req.body, { new: true });

            if (!colaborador) {
                return resp.status(404).json({ message: "Colaborador não encontrado." });
            }

            console.log("Colaborador atualizado com sucesso:", colaborador);
            return resp.json(colaborador);
        } catch (error) {
            console.error("Erro ao atualizar colaborador:", error);
            return resp.status(500).json({ message: "Erro interno ao atualizar colaborador." });
        }
    },

    async deleteColaborador(req, resp) {
        try {
            const deletedColaborador = await Colaborador.findByIdAndRemove(req.params.id);

            if (!deletedColaborador) {
                return resp.status(404).json({ message: "Colaborador não encontrado." });
            }

            console.log("Colaborador deletado com sucesso:", deletedColaborador);
            return resp.status(204).send(); // 204 significa "No Content"
        } catch (error) {
            console.error("Erro ao deletar colaborador:", error);
            return resp.status(500).json({ message: "Erro interno ao deletar colaborador." });
        }
    }


}
