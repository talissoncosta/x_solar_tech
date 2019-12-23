const mongoose = require("mongoose");

const ClienteSchema = new mongoose.Schema(
  {

    nome: {
      type: String,
      required: true
    },
    cpf: {
      type: String,
      required: true
    },
    telefone: String,
    email: String,
    enderecos: [
      {
        cidade: String,
        estado: String,
        bairro: String,        
        rua: String,
        numero: String,
        complemento: String,
        tipo: ["comercial","residencial","rural", "casa de praia"],
        principal: Boolean
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Cliente", ClienteSchema);