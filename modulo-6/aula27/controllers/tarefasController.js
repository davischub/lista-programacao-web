const model = require("../models/tarefasModel");

function listar(req, res) {
  res.json(model.getAll());
}

function buscar(req, res) {
  const tarefa = model.getById(Number(req.params.id));
  if (!tarefa) return res.status(404).json({ erro: "Tarefa não encontrada" });
  res.json(tarefa);
}

function criar(req, res) {
  const { titulo } = req.body;
  const nova = model.create(titulo);
  res.status(201).json(nova);
}

function atualizar(req, res) {
  const tarefa = model.update(Number(req.params.id), req.body);
  if (!tarefa) return res.status(404).json({ erro: "Tarefa não encontrada" });
  res.json(tarefa);
}

function deletar(req, res) {
  const ok = model.remove(Number(req.params.id));
  if (!ok) return res.status(404).json({ erro: "Tarefa não encontrada" });
  res.json({ mensagem: "Tarefa removida com sucesso" });
}

module.exports = { listar, buscar, criar, atualizar, deletar };