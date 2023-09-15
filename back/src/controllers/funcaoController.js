const mongoose = require("mongoose")
const Funcao = mongoose.model('Funcao')


module.exports = {
    async insertFuncao(req, resp) {
        try {
            const novoFuncao = await Funcao.create(req.body);

            console.log("Funcao cadastrado com sucesso:", novoFuncao);
            return resp.status(201).json(novoFuncao);
        } catch (error) {
            console.error("Erro ao cadastrar Funcao:", error);
            return resp.status(500).json({ message: "Erro interno ao cadastrar Funcao." });
        }
    }
    ,

    async listFuncao(req, resp) {
        try {
            const { page } = req.query;

            // Convertendo a página para um número inteiro
            const pageNumber = parseInt(page, 10) || 1;
            const pageSize = 15;

            const options = {
                page: pageNumber,
                limit: pageSize,
            };

            const funcoesPaginadas = await Funcao.paginate({}, options);

            if (!funcoesPaginadas) {
                return resp.status(404).json({ message: "Nenhum Funcao encontrado." });
            }
            return resp.json(funcoesPaginadas);
        } catch (error) {
            console.error("Erro ao listar Funcoes:", error);
            return resp.status(500).json({ message: "Erro interno ao listar Funcoes." });
        }
    },
    async details(req, resp) {
        try {
            const value = req.params.id;
            const isObjectId = mongoose.isValidObjectId(value);
    
            let funcao;
    
            if (isObjectId) {
                funcao = await Funcao.findById(value);
            } else {
                funcao = await Funcao.findOne({ nome: value });
            }
    
            if (!funcao) {
                return resp.status(404).json({ message: "Funcao não encontrada." });
            }
    
            console.log(`Detalhes da Funcao:`, funcao);
            return resp.json(funcao);
    
    
        } catch (error) {
            console.error("Erro ao buscar detalhes da Funcao:", error);
            return resp.status(500).json({ message: "Erro interno ao buscar detalhes da Funcao." });
        }
    }
    ,
    async updateFuncao(req, resp) {
        try {
            const updatedFuncao = await Funcao.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
            if (!updatedFuncao) {
              return resp.status(404).json({ message: "Funcao não encontrado." });
            }
        
            console.log("Funcao atualizado com sucesso:", updatedFuncao);
            return resp.json(updatedFuncao);
          } catch (error) {
            console.error("Erro ao atualizar Funcao:", error);
            return resp.status(500).json({ message: "Erro interno ao atualizar Funcao." });
          }
        
    },
    async deleteFuncao(req, resp) {
        try {
            const deletedFuncao = await Funcao.findByIdAndRemove(req.params.id);

            if (!deletedFuncao) {
                return resp.status(404).json({ message: "Funcao não encontrado." });
            }

            console.log("Funcao deletado com sucesso:", deletedFuncao);
            return resp.status(204).send(); // 204 significa "No Content"
        } catch (error) {
            console.error("Erro ao deletar Funcao:", error);
            return resp.status(500).json({ message: "Erro interno ao deletar Funcao." });
        }
    }


}
