const form        = document.getElementById("form-tarefa");
const inputTarefa = document.getElementById("input-tarefa");
const lista       = document.getElementById("lista");
const busca       = document.getElementById("busca");

// 🏆 Desafio: carrega tarefas salvas no localStorage ao iniciar
function carregarDoStorage() {
  const salvas = JSON.parse(localStorage.getItem("tarefas")) || [];
  salvas.forEach(({ texto, concluida }) => criarItem(texto, concluida));
}

function salvarNoStorage() {
  const itens = [...document.querySelectorAll("li")];
  const tarefas = itens.map(li => ({
    texto: li.querySelector("span").textContent,
    concluida: li.classList.contains("concluida")
  }));
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function criarItem(texto, concluida = false) {
  const li = document.createElement("li");
  if (concluida) li.classList.add("concluida");

  li.innerHTML = `
    <span>${texto}</span>
    <button class="btn-remover">X</button>
  `;

  lista.appendChild(li);
  salvarNoStorage();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const texto = inputTarefa.value.trim();
  if (!texto) return;

  criarItem(texto);
  inputTarefa.value = "";
});

lista.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  if (e.target.classList.contains("btn-remover")) {
    li.remove();
    salvarNoStorage();
    return;
  }

  li.classList.toggle("concluida");
  salvarNoStorage();
});

busca.addEventListener("input", () => {
  const termo = busca.value.toLowerCase();
  const itens = document.querySelectorAll("li");

  itens.forEach(li => {
    const texto = li.querySelector("span").textContent.toLowerCase();
    li.classList.toggle("oculto", !texto.includes(termo));
  });
});

carregarDoStorage();