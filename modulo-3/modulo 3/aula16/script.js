const coresTipo = {
  fire:"#f97316", water:"#3b82f6", grass:"#22c55e",
  electric:"#eab308", psychic:"#ec4899", ice:"#67e8f9",
  dragon:"#7c3aed", dark:"#374151", fairy:"#f9a8d4",
  fighting:"#b45309", poison:"#a855f7", ground:"#d97706",
  rock:"#78716c", ghost:"#6366f1", steel:"#94a3b8",
  bug:"#84cc16", normal:"#a8a29e", flying:"#38bdf8",
};

const nomeStat = {
  hp:"Vida", attack:"Ataque", defense:"Defesa",
  "special-attack":"Atq. Especial",
  "special-defense":"Def. Especial",
  speed:"Velocidade",
};

const input     = document.getElementById("input-pokemon");
const btnBuscar = document.getElementById("btn-buscar");
const status    = document.getElementById("status");
const card      = document.getElementById("card");

async function buscarPokemon() {
  const nome = input.value.trim().toLowerCase();
  if (!nome) return;

  status.textContent = "Carregando...";
  card.style.display = "none";

  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + nome);
    if (!res.ok) throw new Error("Pokémon não encontrado!");
    const data = await res.json();
    exibirCard(data);
    status.textContent = "";
  } catch (err) {
    status.textContent = "❌ " + err.message;
    card.style.display = "none";
  }
}

function exibirCard(data) {
  const nome   = data.name;
  const numero = String(data.id).padStart(3, "0");
  const imagem = data.sprites.other?.["official-artwork"]?.front_default
              || data.sprites.other?.home?.front_default
              || data.sprites.front_default;
  const tipos  = data.types.map(function(t) { return t.type.name; });
  const stats  = data.stats;
  const cor    = coresTipo[tipos[0]] || "#6b7280";

  var tiposHTML = "";
  tipos.forEach(function(tipo) {
    tiposHTML += '<span class="tipo" style="background:' + (coresTipo[tipo] || "#6b7280") + '">' + tipo + "</span>";
  });

  var statsHTML = "";
  stats.forEach(function(s) {
    var label = nomeStat[s.stat.name] || s.stat.name;
    var valor = s.base_stat;
    var pct   = Math.min((valor / 255) * 100, 100);
    statsHTML += '<div class="stat">'
      + '<div class="stat-info"><span>' + label + "</span><span>" + valor + "</span></div>"
      + '<div class="barra-fundo"><div class="barra" style="width:' + pct + '%;background:' + cor + '"></div></div>'
      + "</div>";
  });

  card.innerHTML = '<img src="' + imagem + '" alt="' + nome + '">'
    + "<h2>" + nome + "</h2>"
    + '<div class="numero">#' + numero + "</div>"
    + '<div class="tipos">' + tiposHTML + "</div>"
    + '<div class="stats"><h3>Estatísticas</h3>' + statsHTML + "</div>";

  card.style.display = "block";
}

btnBuscar.addEventListener("click", buscarPokemon);
input.addEventListener("keydown", function(e) {
  if (e.key === "Enter") buscarPokemon();
});