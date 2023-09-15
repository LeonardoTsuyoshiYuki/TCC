const mongoose = require("mongoose");
const Colaborador = mongoose.model("User");
const ListagemEpis = mongoose.model('ListaEpi');

module.exports = {
    async insertColaborador(req, resp) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const colaboradorData = req.body;

            // Verifica se a matrícula já existe
            const existingColaborador = await Colaborador.findOne({ matricula: colaboradorData.matricula });
            if (existingColaborador) {
                return resp.status(400).json({ message: "Matrícula já existente", matricula: colaboradorData.matricula });
            }

            const listaEpisVazia = await ListagemEpis.create({ epis: [] });
            colaboradorData.listagem = listaEpisVazia._id;

            const novoColaborador = await Colaborador.create(colaboradorData);

            await session.commitTransaction();
            session.endSession();

            console.log("Colaborador cadastrado com sucesso:", novoColaborador);
            return resp.status(201).json(novoColaborador);
        } catch (error) {
            await session.abortTransaction();
            session.endSession();

            console.error("Erro ao cadastrar colaborador:", error);
            return resp.status(500).json({ message: "Erro interno ao cadastrar colaborador.", error: error.message });
        }
    },

    async listColaborador(req, res) {
        try {
            const { page, nome, matricula, cpf, ativo } = req.query;
            const pageNumber = parseInt(page, 10) || 1;
            const pageSize = 15;
    
            const query = {};
            if (nome) {
                query.nome = { $regex: new RegExp(nome, 'i') }; // Pesquisa por nome (case-insensitive)
            }
            if (matricula) {
                query.matricula = matricula;
            }
            if (cpf) {
                query.cpf = cpf;
            }
            if (ativo !== undefined) {
                query.ativo = (ativo.toLowerCase() === 'true'); // Converte a string 'true' em booleano
            }
    
            const options = {
                page: pageNumber,
                limit: pageSize,
                populate: ['cargo', 'listagem']
            };
    
            const { docs: colaborador, totalDocs: total } = await Colaborador.paginate(query, options);
    
            if (total === 0) {
                return res.status(404).json({ message: "Nenhum colaborador encontrado." });
            }
            return res.json({ colaborador, total });
        } catch (error) {
            console.error("Erro ao listar colaboradores:", error);
            return res.status(500).json({ message: "Erro interno ao listar colaboradores." });
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
            const idColaborador = req.params.id;

            if (!mongoose.isValidObjectId(idColaborador)) {
                return res.status(400).json({ message: "ID de colaborador inválido." });
            }

            const colaboradorExcluido = await Colaborador.findByIdAndRemove(idColaborador);

            if (!colaboradorExcluido) {
                return res.status(404).json({ message: "Colaborador não encontrado." });
            }

            console.log("Colaborador excluído com sucesso:", colaboradorExcluido);
            return res.status(204).send(); // 204 significa "No Content"
        } catch (error) {
            console.error("Erro ao excluir colaborador:", error);
            return res.status(500).json({ message: "Erro interno ao excluir colaborador." });
        }
    }

};
