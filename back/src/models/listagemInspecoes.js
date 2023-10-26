const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const ListagemInspecoesSchema = new mongoose.Schema({
    inspecoes: [{
        inspecao: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Inspecao',
        }
    }],
    registro: {
        type: Date,
        default: Date.now
    }
});


ListagemInspecoesSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('ListagemInspecoes', ListagemInspecoesSchema);
