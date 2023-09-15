const mongoose = require("mongoose");
const mongoosePaginacao = require('mongoose-paginate')

const PerguntaSchema = new mongoose.Schema({
    pergunta: {
        type: String,
        required: true,
        unique: true,
    },
});
PerguntaSchema.plugin(mongoosePaginacao)
mongoose.model('Pergunta', PerguntaSchema);
