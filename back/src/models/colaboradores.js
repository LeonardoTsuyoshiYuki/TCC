const mongoose = require("mongoose")
const mongoosePaginacao = require('mongoose-paginate')

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
        uppercase: true,
        minlength: 3,
        maxlength: 200,
    },
    matricula: {
        type: Number,
        require: true,
        length: 10,
        unique: true,
    },
    email: {
        type: String,
        require: true,
    lowercase: true,
        minlength: 9,
        maxlength: 200,

    },
    cargo:{
        type: String,
        require: true,
        uppercase: true,
    },
    telefone:{
        type: Number,
        require: true, 
        length: 11,
    },
    cpf:{
        type: Number,
        require: true, 
        length: 11,

    },
    password:{
        type: Number,
        require: true, 
        length: 3,
    },
    ativo: {
        type: Boolean,
        require: true,
        default: true,
    },
    endereco:{
        cidade:{
            type: String,
            require: true,
        },
        estado:{
            type: String,
            required: true,
            minlength: 2,
            maxlength: 2,
        },
        polo:{
            type: Number,
            required: true,
            length: 5,
        }
    },
    
    registro: {
        type: Date,
        default: Date.now
    }
})


UserSchema.plugin(mongoosePaginacao)
mongoose.model('User', UserSchema);