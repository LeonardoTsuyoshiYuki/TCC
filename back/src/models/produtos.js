const mongoose = require("mongoose");
const mongoosePaginacao = require('mongoose-paginate');
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
        length: 10,
    },
    validadeCA: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^\d{2}\/\d{2}\/\d{4}$/.test(value);
            },
            message: props => `${props.value} não está no formato dd/mm/yyyy.`
        }
    },
    fabricacao: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^\d{2}\/\d{2}\/\d{4}$/.test(value);
            },
            message: props => `${props.value} não está no formato dd/mm/yyyy.`
        }
    },
    quantidade: {
        type: Number,
        required: true,
        length: 10,
    },
    registro: {
        type: Date,
        default: Date.now
    }
});

ProdutoSchema.plugin(mongoosePaginacao);

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

mongoose.model('Produto', ProdutoSchema);
