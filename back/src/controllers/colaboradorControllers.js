const mongoose = require("mongoose");
const Colaborador = mongoose.model('User');

module.exports = {
    async insertColaborador(req, resp) {
        try {
            const novoColaborador = await Colaborador.create(req.body);
            console.log("Colaborador cadastrado com sucesso:", novoColaborador);
            return resp.status(201).json(novoColaborador);
        } catch (error) {
            console.error("Erro ao cadastrar colaborador:", error);
            return resp.status(500).json({ message: "Erro interno ao cadastrar colaborador.", error: error.message });
        }
    },

    async listColaborador(req, res) {
        try {
            const { page } = req.query;
            const pageNumber = parseInt(page, 10) || 1;
            const pageSize = 15;

            const options = {
                page: pageNumber,
                limit: pageSize,
                populate: ['cargo', 'listagem']
            };

            const { docs: colaborador, totalDocs: total } = await Colaborador.paginate({}, options);

            if (total === 0) {
                return res.status(404).json({ message: "Nenhum colaborador encontrado." });
            }

            console.log("Colaboradores cadastrados:", colaborador);
            return res.json({ colaborador, total });
        } catch (error) {
            console.error("Erro ao listar colaboradores:", error);
            return res.status(500).json({ message: "Erro interno ao listar colaboradores." });
        }
    },

    async details(req, res) {
        try {
            const matricula = req.params.value;
    
            const colaborador = await Colaborador.findOne({ 
                matricula: new RegExp(`^${matricula}$`, 'i'), // Filtro exato na matrícula
                departamento: "RH" // Filtro para o departamento
            }).populate('cargo listagem');
    
            if (!colaborador) {
                console.log(`Colaborador com matrícula '${matricula}' não encontrado ou não pertence ao departamento 'RH'.`);
                return res.status(404).json({ message: "Colaborador não encontrado ou não pertence ao departamento 'RH'." });
            }
    
            console.log(`Detalhes do colaborador com matrícula '${matricula}':`, colaborador);
            return res.json(colaborador);
        } catch (error) {
            console.error("Erro ao buscar detalhes do colaborador:", error);
            return res.status(500).json({ message: "Erro interno ao buscar detalhes do colaborador." });
        }
    },

    async updateColaborador(req, res) {
        try {
            const colaborador = await Colaborador.findByIdAndUpdate(req.params.id, req.body, { new: true });

            if (!colaborador) {
                return res.status(404).json({ message: "Colaborador não encontrado." });
            }

            console.log("Colaborador atualizado com sucesso:", colaborador);
            return res.json(colaborador);
        } catch (error) {
            console.error("Erro ao atualizar colaborador:", error);
            return res.status(500).json({ message: "Erro interno ao atualizar colaborador." });
        }
    },

    async deleteColaborador(req, res) {
        try {
            const deletedColaborador = await Colaborador.findByIdAndRemove(req.params.id);

            if (!deletedColaborador) {
                return res.status(404).json({ message: "Colaborador não encontrado." });
            }

            console.log("Colaborador deletado com sucesso:", deletedColaborador);
            return res.status(204).send(); // 204 significa "No Content"
        } catch (error) {
            console.error("Erro ao deletar colaborador:", error);
            return res.status(500).json({ message: "Erro interno ao deletar colaborador." });
        }
    }
};
