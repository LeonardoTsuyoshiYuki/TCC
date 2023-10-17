const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const InspecoesSchema = new mongoose.Schema({
    inspecoes: [{
        pergunta: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pergunta',
        },
        resposta: {
            type: String,
            uppercase: true,
            maxlength: 200,
        },
    }],
    registro: {
        type: Date,
        default: Date.now
    }
});

// Validar tamanho da resposta
InspecoesSchema.path('inspecoes.resposta').validate(function(value) {
    return value.length <= 200;
}, 'Resposta length must not exceed 200 characters');

InspecoesSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Inspecoes', InspecoesSchema);
