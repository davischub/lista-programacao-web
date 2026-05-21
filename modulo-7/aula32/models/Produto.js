const mongoose = require("mongoose");

const produtoSchema = new mongoose.Schema({
  nome:      { type: String, required: [true, "Nome obrigatório"], trim: true },
  descricao: { type: String, default: "" },
  preco:     { type: Number, required: true, min: [0, "Preço não pode ser negativo"] },
  categoria: { type: String, required: true,
    enum: ["Eletrônicos", "Roupas", "Alimentos", "Livros", "Outros"]
  },
  estoque:   { type: Number, default: 0, min: 0 },
  ativo:     { type: Boolean, default: true },
  criadoPor: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }
}, { timestamps: true });

module.exports = mongoose.model("Produto", produtoSchema);