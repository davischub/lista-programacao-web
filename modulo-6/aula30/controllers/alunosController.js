const Aluno = require("../models/Aluno");

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

async function criar(req, res) {
  try {
    const aluno = await Aluno.create(req.body);
    res.status(201).json(aluno);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

async function atualizar(req, res) {
  try {
    const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!aluno) return res.status(404).json({ erro: "Aluno não encontrado" });
    res.json(aluno);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

async function deletar(req, res) {
  try {
    const aluno = await Aluno.findByIdAndDelete(req.params.id);
    if (!aluno) return res.status(404).json({ erro: "Aluno não encontrado" });
    res.json({ mensagem: "Aluno removido" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

module.exports = { listar, criar, atualizar, deletar };