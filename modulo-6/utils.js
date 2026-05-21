function somar(a, b) {
  return a + b;
}

function ePar(n) {
  return n % 2 === 0;
}

function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

module.exports = { somar, ePar, capitalizar };