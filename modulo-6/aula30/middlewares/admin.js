function apenasAdmin(req, res, next) {
  if (req.usuario.role !== "admin") {
    return res.status(403).json({ erro: "Acesso restrito a administradores" });
  }
  next();
}

module.exports = apenasAdmin;