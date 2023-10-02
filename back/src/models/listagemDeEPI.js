const mongoose = require('mongoose');
const mongoosePaginacao = require('mongoose-paginate');
const moment = require('moment');
const Produto = require('./produtos');

const ListaEpiSchema = new mongoose.Schema({
        
        produtos: [{
            produto: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Produto',
            },
            quantidade: {
                type: Number,
                min: 0,
                max: 10,
            },
            entrega: Date,
            vistoEntrega: {
                type: String,
                uppercase: true,
                minlength: 3,
                maxlength: 200
            },
            devolucao: Date,
            vistoDevolucao: {
                type: String,
                uppercase: true,
                minlength: 3,
                maxlength: 200
            }
        }],
        registro: {
            type: Date,
            default: Date.now
        }
    })

ListaEpiSchema.pre('save', function (next) {
    if (this.entrega) {
        this.entrega = moment.utc(this.entrega, 'DD/MM/YYYY', true);
        if (!this.entrega.isValid()) {
            return next(new Error('Data de entrega inválida.'));
        }
    }
    if (this.devolucao) {
        this.devolucao = moment.utc(this.devolucao, 'DD/MM/YYYY', true);
        if (!this.devolucao.isValid()) {
            return next(new Error('Data de devolução inválida.'));
        }
    }
    next();
});

ListaEpiSchema.plugin(mongoosePaginacao);
const ListaEpi = mongoose.model('ListaEpi', ListaEpiSchema);

module.exports = ListaEpi;