const express=require('express')
const routes=express.Router()

const colaboradorController=require('../controllers/colaboradorControllers')
const funcaoController=require('../controllers/funcaoController')
const produtosController=require('../controllers/produtosController')
const listagemEPIController=require('../controllers/listagemEPIControlle')















//Rotas de Colaborador
routes.get('/colaboradores/:id', colaboradorController.details)
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
routes.get('/listaEpi/:id', listagemEPIController.details)
routes.get('/listaEpi', listagemEPIController.listListaEpi)
routes.post('/listaEpi', listagemEPIController.insertListaEpi)
routes.put('/listaEpi/:id', listagemEPIController.updateListaEpi)
routes.delete('/listaEpi/:id', listagemEPIController.deleteListaEpi)





module.exports = routes