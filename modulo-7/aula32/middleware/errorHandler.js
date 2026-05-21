module.exports = function(err, req, res, next) {
  console.error("❌", err.message);

  if (err.name === "ValidationError") {
    const erros = Object.values(err.errors).map(function(e) { return e.message; });
    return res.status(400).json({ erro: "Validação", detalhes: erros });
  }
  if (err.name === "CastError")
    return res.status(400).json({ erro: "ID inválido" });
  if (err.code === 11000)
    return res.status(409).json({ erro: "Registro duplicado" });

  res.status(500).json({ erro: "Erro interno do servidor" });
};