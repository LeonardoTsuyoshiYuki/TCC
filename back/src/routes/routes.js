const express=require('express')
const routes=express.Router()

const colaboradorController=require('../controllers/colaboradorControllers')
const funcaoController=require('../controllers/funcaoController')
const produtosController=require('../controllers/produtosController')
const listagemEPIController=require('../controllers/listagemEPIControlle')
const PerguntaController=require('../controllers/perguntaControlle')
const ListagemInspecoesController=require('../controllers/listagemInspecoesController')
const InspecaoController=require('../controllers/inspecaoController')












//Rotas de Colaborador
routes.get('/colaboradores', colaboradorController.listColaborador)
routes.post('/colaboradores', colaboradorController.insertColaborador)
routes.put('/colaboradores/:id', colaboradorController.updateColaborador)
routes.delete('/colaboradores/:id', colaboradorController.deleteColaborador)
//Rotas de Funcao
routes.get('/funcao/:id', funcaoController.details)
routes.get('/funcao', funcaoController.listFuncao)
routes.post('/funcao', funcaoController.insertFuncao)
routes.put('/funcao/:id', funcaoController.updateFuncao)
routes.delete('/funcao/:id', funcaoController.deleteFuncao)
//Rotas de Produto
routes.get('/produtos/:id', produtosController.details)
routes.get('/produtos', produtosController.listProduto)
routes.post('/produtos', produtosController.insertProduto)
routes.put('/produtos/:id', produtosController.updateProduto)
routes.delete('/produtos/:id', produtosController.deleteProduto)
//Rotas de Listagem de EPIs
routes.get('/listaEpi', listagemEPIController.listListaEpi)
routes.post('/listaEpi', listagemEPIController.insertListaEpi)
routes.put('/listaEpi/:id', listagemEPIController.adicionarProdutosListaEpi)
routes.delete('/listaEpi/:id', listagemEPIController.deleteListaEpi)

// Rotas para Pergunta
routes.get('/pergunta', PerguntaController.listPergunta);
routes.post('/pergunta', PerguntaController.insertPergunta);
routes.put('/pergunta/:id', PerguntaController.updatePergunta);
routes.delete('/pergunta/:id', PerguntaController.deletePergunta);

// Rotas para Listagem Inspecoes
routes.get('/listagemInspecao', ListagemInspecoesController.listListagemInspecoes);
routes.get('/listagemInspecao/:id', ListagemInspecoesController.details);
routes.post('/listagemInspecao', ListagemInspecoesController.insertListagemInspecoes);
routes.put('/listagemInspecao/:id', ListagemInspecoesController.updateListagemInspecoes);
routes.delete('/listagemInspecao/:id', ListagemInspecoesController.deleteListagemInspecoes);

// Rotas para Inspeção
routes.get('/inspecao', InspecaoController.listInspecao);
routes.post('/inspecao/:id', InspecaoController.insertInspecao);
routes.delete('/inspecao/:id', InspecaoController.deleteInspecao);



module.exports = routes