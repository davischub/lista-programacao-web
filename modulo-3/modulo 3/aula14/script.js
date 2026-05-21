const produtos = [
  { nome: "Notebook",    preco: 3500, categoria: "eletrônicos" },
  { nome: "Tênis",       preco: 299,  categoria: "roupas"       },
  { nome: "Smartphone",  preco: 1999, categoria: "eletrônicos" },
  { nome: "Mochila",     preco: 150,  categoria: "acessórios"   },
  { nome: "Fone Bluetooth", preco: 450, categoria: "eletrônicos" },
];

const container = document.getElementById("container");
const btnFiltrar  = document.getElementById("btn-filtrar");
const btnLimpar   = document.getElementById("btn-adicionar");
const btnAdicionar = document.getElementById("btn-adicionar");

function criarCard(produto) {
  const card = document.createElement("div");
  card.classList.add("card");

  if (produto.categoria !== "eletrônicos") {
    card.classList.add("nao-eletronico");
  }

  card.innerHTML = `
    <h3>${produto.nome}</h3>
    <div class="preco">R$ ${produto.preco.toFixed(2)}</div>
    <span class="categoria">${produto.categoria}</span>
  `;

  container.appendChild(card);
}

function renderizarProdutos() {
  container.innerHTML = "";
  produtos.forEach(produto => criarCard(produto));
}

renderizarProdutos();

document.getElementById("btn-filtrar").addEventListener("click", () => {
  const naoEletronicos = document.querySelectorAll(".nao-eletronico");
  naoEletronicos.forEach(card => card.classList.toggle("oculto"));
});

document.getElementById("btn-limpar").addEventListener("click", () => {
  container.innerHTML = "";
});

document.getElementById("btn-adicionar").addEventListener("click", () => {
  const nome      = document.getElementById("input-nome").value.trim();
  const preco     = parseFloat(document.getElementById("input-preco").value);
  const categoria = document.getElementById("input-categoria").value.trim().toLowerCase();

  if (!nome || isNaN(preco) || !categoria) {
    alert("Preencha todos os campos!");
    return;
  }

  const novoProduto = { nome, preco, categoria };
  produtos.push(novoProduto);
  criarCard(novoProduto);

  document.getElementById("input-nome").value      = "";
  document.getElementById("input-preco").value     = "";
  document.getElementById("input-categoria").value = "";
});