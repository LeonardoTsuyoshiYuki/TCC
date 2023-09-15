const mongoose = require("mongoose");
const mongoosePaginacao = require('mongoose-paginate')

const InspecoesSchema = new mongoose.Schema({
    data: {
        type: Date,
        default: Date.now,
    },
    perguntas: {
        pergunta: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pergunta',
        },
    },
    resposta: {
        type: String, 
    },
    registro: {
        type: Date,
        default: Date.now
    }

});
InspecoesSchema.pre('save', function(next) {
    if (this.data) {
        this.data = moment(this.data, 'DD/MM/YYYY').toDate();
    }
    next();
});

InspecoesSchema.plugin(mongoosePaginacao)
mongoose.model('Inspecoes', InspecoesSchema);