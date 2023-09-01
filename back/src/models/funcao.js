const mongoose = require("mongoose")
const mongoosePaginacao = require('mongoose-paginate')

const FuncaoSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
        uppercase: true,
        minlength: 3,
        maxlength: 200,
    },
    tipo: {
        type: String,
        require: true,
        length: 200,
        uppercase: true,
    },
    registro: {
        type: Date,
        default: Date.now
    }
})


FuncaoSchema.plugin(mongoosePaginacao)
mongoose.model('Funcao', FuncaoSchema);