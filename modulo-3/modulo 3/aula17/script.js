let perguntas = [];
let atual  = 0;
let pontos = 0;

const elInicio    = document.getElementById("inicio");
const elQuiz      = document.getElementById("quiz");
const elResultado = document.getElementById("resultado");
const elProgresso = document.getElementById("progresso");
const elPergunta  = document.getElementById("pergunta");
const elOpcoes    = document.getElementById("opcoes");
const btnIniciar  = document.getElementById("btnIniciar");

async function buscarPerguntas() {
  const url = "https://tryvia.ptr.red/api.php?amount=10&type=multiple";
  try {
    const res  = await fetch(url);
    const data = await res.json();
    perguntas = data.results;
  } catch (erro) {
    console.log("Erro:", erro);
  }
}

function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}

function getAlternativas(pergunta) {
  const todas = [
    ...pergunta.incorrect_answers,
    pergunta.correct_answer
  ];
  return embaralhar(todas);
}

function exibirPergunta() {
  const p = perguntas[atual];
  const alternativas = getAlternativas(p);

  elProgresso.textContent = (atual + 1) + " / " + perguntas.length;
  elPergunta.innerHTML = p.question;

  elOpcoes.innerHTML = "";
  alternativas.forEach(function(alt) {
    const btn = document.createElement("button");
    btn.innerHTML   = alt;
    btn.className   = "opcao";
    elOpcoes.appendChild(btn);
  });
}

elOpcoes.addEventListener("click", function(e) {
  if (!e.target.classList.contains("opcao")) return;

  const botoes = document.querySelectorAll(".opcao");
  botoes.forEach(function(btn) { btn.disabled = true; });

  const resposta = e.target.textContent;
  const correta  = perguntas[atual].correct_answer;

  if (resposta === correta) {
    pontos++;
    e.target.classList.add("correta");
  } else {
    e.target.classList.add("errada");
    botoes.forEach(function(btn) {
      if (btn.textContent === correta) btn.classList.add("correta");
    });
  }

  setTimeout(function() {
    atual++;
    if (atual < perguntas.length) {
      exibirPergunta();
    } else {
      exibirResultado();
    }
  }, 1000);
});

function exibirResultado() {
  elQuiz.hidden      = true;
  elResultado.hidden = false;

  const total = perguntas.length;
  const pct   = Math.round((pontos / total) * 100);

  let msg = "Tente novamente!";
  if (pct >= 80) msg = "Excelente! 🏆";
  else if (pct >= 60) msg = "Bom trabalho! 👍";

  elResultado.innerHTML =
    "<h2>" + msg + "</h2>" +
    "<p>" + pontos + " de " + total + " (" + pct + "%)</p>" +
    '<button id="btnReiniciar">Jogar novamente</button>';

  document.getElementById("btnReiniciar").addEventListener("click", reiniciar);
}

async function reiniciar() {
  atual  = 0;
  pontos = 0;
  elResultado.hidden = true;
  elInicio.hidden    = false;
}

btnIniciar.addEventListener("click", async function() {
  elInicio.hidden = true;
  await buscarPerguntas();
  elQuiz.hidden = false;
  exibirPergunta();
});