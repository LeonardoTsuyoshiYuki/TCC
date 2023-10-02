const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        uppercase: true,
        minlength: 3,
        maxlength: 200
    },
    matricula: {
        type: String,
        required: true,
        unique: true,
        length: 10
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 9,
        maxlength: 200,
        unique: true
    },
    cargo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Funcao'
    },
    inspecao: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inspecoes'
    },
    listagem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ListaEpi'
    },
    telefone: {
        type: String,
        required: true,
        length: 11
    },
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    },
    ativo: {
        type: Boolean,
        required: true,
        default: true
    },
    endereco: {
        cidade: {
            type: String,
            required: true
        },
        estado: {
            type: String,
            required: true,
            maxlength: 30
        },
        polo: {
            type: String,
            required: true,
        }
    },
    registro: {
        type: Date,
        default: Date.now
    }
});

UserSchema.plugin(mongoosePaginate);

mongoose.model('User', UserSchema);
