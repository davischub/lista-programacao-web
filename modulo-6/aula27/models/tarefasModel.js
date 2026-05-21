// Banco de dados em memória
let tarefas = [
  { id: 1, titulo: "Estudar Node.js",  concluida: false },
  { id: 2, titulo: "Fazer exercícios", concluida: true  },
];

let proximoId = 3;

function getAll() {
  return tarefas;
}

function getById(id) {
  return tarefas.find(function(t) { return t.id === id; });
}

function create(titulo) {
  const nova = { id: proximoId++, titulo: titulo, concluida: false };
  tarefas.push(nova);
  return nova;
}

function update(id, dados) {
  const tarefa = getById(id);
  if (!tarefa) return null;
  if (dados.titulo    !== undefined) tarefa.titulo    = dados.titulo;
  if (dados.concluida !== undefined) tarefa.concluida = dados.concluida;
  return tarefa;
}

function remove(id) {
  const index = tarefas.findIndex(function(t) { return t.id === id; });
  if (index === -1) return false;
  tarefas.splice(index, 1);
  return true;
}

module.exports = { getAll, getById, create, update, remove };