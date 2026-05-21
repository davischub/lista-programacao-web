const mongoose = require("mongoose");

const alunoSchema = new mongoose.Schema({
  nome:  { type: String, required: true },
  email: { type: String, required: true, unique: true },
  idade: { type: Number },
  curso: { type: String, required: true },
  notas: { type: [Number], default: [] },
}, { timestamps: true });

module.exports = mongoose.model("Aluno", alunoSchema);