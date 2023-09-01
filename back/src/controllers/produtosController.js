const mongoose = require("mongoose");
const Produto = mongoose.model('Produto');
const moment = require('moment');

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

            console.log("Produtos cadastrados:", produtosPaginados);
            return resp.json(produtosPaginados);
        } catch (error) {
            console.error("Erro ao listar Produtos:", error);
            return resp.status(500).json({ message: "Erro interno ao listar Produtos." });
        }
    },

    async details(req, resp) {
        try {
            const { id } = req.params;
            const produto = await Produto.findById(id);

            if (!produto) {
                return resp.status(404).json({ message: "Produto não encontrado." });
            }

            console.log(`Detalhes do Produto:`, produto);
            return resp.json(produto);
    
        } catch (error) {
            console.error("Erro ao buscar detalhes do Produto:", error);
            return resp.status(500).json({ message: "Erro interno ao buscar detalhes do Produto." });
        }
    },

    async updateProduto(req, resp) {
        try {
            const { id } = req.params;
            const updatedProduto = await Produto.findByIdAndUpdate(id, req.body, { new: true });
        
            if (!updatedProduto) {
              return resp.status(404).json({ message: "Produto não encontrado." });
            }
        
            console.log("Produto atualizado com sucesso:", updatedProduto);
            return resp.json(updatedProduto);
          } catch (error) {
            console.error("Erro ao atualizar Produto:", error);
            return resp.status(500).json({ message: "Erro interno ao atualizar Produto." });
          }
    },

    async deleteProduto(req, resp) {
        try {
            const { id } = req.params;
            const deletedProduto = await Produto.findByIdAndRemove(id);

            if (!deletedProduto) {
                return resp.status(404).json({ message: "Produto não encontrado." });
            }

            console.log("Produto deletado com sucesso:", deletedProduto);
            return resp.status(204).send(); // 204 significa "No Content"
        } catch (error) {
            console.error("Erro ao deletar Produto:", error);
            return resp.status(500).json({ message: "Erro interno ao deletar Produto." });
        }
    }
}
