  const mongoose = require("mongoose");
  const mongoosePaginate = require('mongoose-paginate-v2');


  const InspecaoSchema = new mongoose.Schema({
    colaborador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    perguntas: [{
      pergunta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pergunta',
      },
      resposta: {
        type: String,
        uppercase: true,
        maxlength: 200,
      }
    }],
    observacoes: {
      type: String,
      uppercase: true,
      maxlength: 2000,
    },
    registro: {
      type: Date,
      default: Date.now,
    }
  });

  InspecaoSchema.plugin(mongoosePaginate);
  const Inspecao = mongoose.model("Inspecao", InspecaoSchema);