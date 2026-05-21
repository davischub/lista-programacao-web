const fs   = require("fs");
const { somar, ePar, capitalizar } = require("./utils");

const resultadoSoma = somar(10, 5);
const par = ePar(resultadoSoma);
const nome = capitalizar("javascript");

console.log("Soma: " + resultadoSoma);
console.log("É par? " + par);
console.log("Nome: " + nome);

const conteudo =
  "Soma: " + resultadoSoma + "\n" +
  "É par? " + par + "\n" +
  "Nome: " + nome + "\n";

fs.writeFileSync("resultado.txt", conteudo);
console.log("Arquivo resultado.txt salvo!");