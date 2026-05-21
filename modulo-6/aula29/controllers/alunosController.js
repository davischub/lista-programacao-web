const Aluno = require("../models/Aluno");

// Listar (com filtro por curso)
async function listar(req, res) {
  try {
    const filtro = {};
    if (req.query.curso) filtro.curso = req.query.curso;
    const alunos = await Aluno.find(filtro);
    res.json(alunos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

// Buscar por ID
async function buscar(req, res) {
  try {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) return res.status(404).json({ erro: "Aluno não encontrado" });
    res.json(aluno);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

// Criar
async function criar(req, res) {
  try {
    const aluno = await Aluno.create(req.body);
    res.status(201).json(aluno);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

// Atualizar
async function atualizar(req, res) {
  try {
    const aluno = await Aluno.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!aluno) return res.status(404).json({ erro: "Aluno não encontrado" });
    res.json(aluno);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

// Deletar
async function deletar(req, res) {
  try {
    const aluno = await Aluno.findByIdAndDelete(req.params.id);
    if (!aluno) return res.status(404).json({ erro: "Aluno não encontrado" });
    res.json({ mensagem: "Aluno removido com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

module.exports = { listar, buscar, criar, atualizar, deletar };