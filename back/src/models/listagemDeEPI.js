const mongoose = require("mongoose")
const mongoosePaginacao = require('mongoose-paginate')
const moment = require('moment');

const ListaEpiSchema = new mongoose.Schema({

    produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produto',
        
    },
    quantidade: {
        type: Number,
        
        length: 10,
    },
    entrega: {
        type: Date,
        
    },
    devolucao: {
        type: Date,
    },
    vistoEntrega: {
        type: String,
    
        uppercase: true,
        minlength: 3,
        maxlength: 200,
    },
    vistoDevolucao: {
        type: String,
        uppercase: true,
        minlength: 3,
        maxlength: 200,
    },
   
    registro: {
        type: Date,
        default: Date.now
    }
})
ListaEpiSchema.pre('save', function(next) {
  
    if (this.entrega) {
        this.entrega = moment(this.entrega, 'DD/MM/YYYY').toDate();
    }
    if (this.devolucao) {
        this.devolucao = moment(this.devolucao, 'DD/MM/YYYY').toDate();
    }
    next();
});

ListaEpiSchema.plugin(mongoosePaginacao)
mongoose.model('ListaEpi', ListaEpiSchema);