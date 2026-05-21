const jwt = require("jsonwebtoken");

function autenticar(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  const token = header.split(" ")[1];

  try {
    const dados = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = dados;
    next();
  } catch (err) {
    res.status(401).json({ erro: "Token inválido ou expirado" });
  }
}

module.exports = autenticar;