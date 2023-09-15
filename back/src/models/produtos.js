const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');
const moment = require('moment');

const ProdutoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        uppercase: true,
        minlength: 3,
        maxlength: 200,
    },
    codigoCA: {
        type: Number,
        required: true,
        unique: true, 
        minlength: 10, 
    },
    validadeCA: {
        type: Date,
        required: true,
    
    },
    fabricacao: {
        type: Date,
        required: true,
        
    },
    quantidade: {
        type: Number,
        required: true,
        minlength: 10, // Isso deveria ser maxlength, não length
    },
    registro: {
        type: Date,
        default: Date.now
    }
});

ProdutoSchema.plugin(mongoosePaginate);

// Antes de salvar, formate as datas no formato DD/MM/YYYY
ProdutoSchema.pre('save', function(next) {
    if (this.validadeCA) {
        this.validadeCA = moment(this.validadeCA, 'DD/MM/YYYY').toDate();
    }
    if (this.fabricacao) {
        this.fabricacao = moment(this.fabricacao, 'DD/MM/YYYY').toDate();
    }
    next();
});

const Produto = mongoose.model('Produto', ProdutoSchema);

module.exports = Produto;
