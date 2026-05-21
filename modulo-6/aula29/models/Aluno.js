const mongoose = require("mongoose");

const alunoSchema = new mongoose.Schema({
  nome:     { type: String, required: [true, "Nome é obrigatório"] },
  email:    { type: String, required: [true, "Email é obrigatório"], unique: true },
  idade:    { type: Number, min: [1, "Idade inválida"] },
  curso:    { type: String, required: [true, "Curso é obrigatório"] },
  notas:    { type: [Number], default: [] },
}, { timestamps: true });

module.exports = mongoose.model("Aluno", alunoSchema);