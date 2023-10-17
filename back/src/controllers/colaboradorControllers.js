const mongoose = require('mongoose');
const Colaborador = mongoose.model('User');
const ListagemEpis = mongoose.model('ListaEpi');
const Inspecoes = mongoose.model('Inspecoes');

const uuid = require('uuid');

module.exports = {
    async insertColaborador(req, resp) {
        try {
            const dadosColaborador = req.body;
    
            // Gerar um UUID para "collaboratorId"
            dadosColaborador.collaboratorId = uuid.v4();
    
            // Criar uma nova lista de EPIS para o colaborador
            const listaEpis = await ListagemEpis.create({ epis: [] });
            dadosColaborador.listagem = listaEpis._id;
    
            // Criar uma nova inspeção para o colaborador
            const inspecao = await Inspecoes.create({ pergunta: [], resposta: [] });
            dadosColaborador.inspecoes = inspecao._id;
    
            // Verificar se os campos obrigatórios estão presentes
            const camposObrigatorios = ['nome', 'matricula', 'email', 'telefone', 'cpf', 'password', 'endereco'];
            const camposFaltantes = camposObrigatorios.filter(campo => !dadosColaborador[campo]);
    
            if (camposFaltantes.length > 0) {
                return resp.status(400).json({ message: `Campos obrigatórios faltando: ${camposFaltantes.join(', ')}` });
            }
    
            // Verificar se a matrícula já existe
            const matriculaExistente = await Colaborador.findOne({ matricula: dadosColaborador.matricula });
            if (matriculaExistente) {
                return resp.status(400).json({ message: "Matrícula já existente", matricula: dadosColaborador.matricula });
            }
    
            // Criar o novo colaborador
            const novoColaborador = await Colaborador.create(dadosColaborador);
            console.log("Colaborador cadastrado com sucesso:", novoColaborador);
    
            return resp.status(201).json(novoColaborador);
        } catch (error) {
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
                query.nome = { $regex: new RegExp(nome, 'i') }; 
            }
            if (matricula) {
                query.matricula = matricula;
            }
            if (cpf) {
                query.cpf = cpf;
            }
            if (ativo !== undefined) {
                query.ativo = (ativo.toLowerCase() === 'true'); 
            }
    
            const options = {
                page: pageNumber,
                limit: pageSize,
                populate: ['cargo', 'listagem', 'inspecoes']  // Adicionando 'inspecoes' para populá-la
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

            if (!mongoose.Types.ObjectId.isValid(idColaborador)) {
                return res.status(400).json({ message: "ID de colaborador inválido." });
            }

            // Antes de excluir o colaborador, obtenha a listagem associada
            const colaborador = await Colaborador.findById(idColaborador);
            const listaEpisId = colaborador.listagem;
            const inspecoesId = colaborador.inspecoes;

            // Se houver uma lista de EPIS associada, exclua-a
            if (listaEpisId) {
                await ListagemEpis.findByIdAndRemove(listaEpisId);
                console.log("Lista de EPIS associada excluída com sucesso.");
            }
    
            // Se houver uma lista de Inspecoes associada, exclua-a
            if (inspecoesId) {
                await Inspecoes.findByIdAndRemove(inspecoesId);
                console.log("Lista de Inspecoes associada excluída com sucesso.");
            }
            const colaboradorExcluido = await Colaborador.findByIdAndRemove(idColaborador);

            if (!colaboradorExcluido) {
                return res.status(404).json({ message: "Colaborador não encontrado." });
            }

            console.log("Colaborador excluído com sucesso:", colaboradorExcluido);
            return res.status(204).send();
        } catch (error) {
            console.error("Erro ao excluir colaborador:", error);
            return res.status(500).json({ message: "Erro interno ao excluir colaborador.", error: error.message });
        }
    }
};
