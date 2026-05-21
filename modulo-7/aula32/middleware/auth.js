const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer "))
    return res.status(401).json({ erro: "Token não fornecido" });

  try {
    const dados = jwt.verify(header.split(" ")[1], process.env.JWT_SECRET);
    req.userId = dados.id;
    next();
  } catch {
    res.status(401).json({ erro: "Token inválido" });
  }
};