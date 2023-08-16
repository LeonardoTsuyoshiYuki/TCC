const express=require('express')
const routes=express.Router()

const colaboradorController=require('../controllers/colaboradorControllers')

routes.get('/colaboradores/:id', colaboradorController.details)
routes.get('/colaboradores', colaboradorController.listColaborador)
routes.post('/colaboradores', colaboradorController.insertColaborador)
routes.put('/colaboradores/:id', colaboradorController.updateColaborador)
routes.delete('/colaboradores/:id', colaboradorController.deleteColaborador)

module.exports = routes