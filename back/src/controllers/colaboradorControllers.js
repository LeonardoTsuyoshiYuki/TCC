const mongoose=require("mongoose")
const Colaborador=mongoose.model('User')


module.exports={
    async insertColaborador(req, resp){
        const colaborador =await Colaborador.create(req.body)
        console.log("Colaborador cadastrado com Sucesso!")
        return resp.json(colaborador)
    }, 
    async listColaborador(req, resp){
        const{ page } = req.query
        const colaborador = await Colaborador.paginate({}, { page , limit: 15 })
        console.log("Colaboradores cadastrados")
        return resp.json(colaborador)
    }, 
    async details (req, resp){
        const colaborador =  await Colaborador.findById(req.params.id)
        console.log(`Colaborador${colaborador}`)
        return resp.json(colaborador)
    }, 
    async updateColaborador(req, resp){
        const colaborador = await Colaborador.findByIdAndUpdate(req.params.id, req.body, { new: true})
        console.log("Colaborador atualizado com Sucesso!")
        return resp.json(colaborador)
    }, 
    async deleteColaborador(req, resp){
        await Colaborador.findByIdAndRemove(req.params.id)
        console.log("Colaborador deletado com Sucesso!")
        return resp.send()
    }

}
