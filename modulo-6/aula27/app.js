const express = require("express");
const app     = express();

app.use(express.json());

app.use(function(req, res, next) {
  const agora = new Date().toLocaleTimeString();
  console.log("[" + agora + "] " + req.method + " " + req.url);
  next();
});

app.use("/tarefas", function(req, res, next) {
  if (req.method === "POST" && !req.body.titulo) {
    return res.status(400).json({ erro: "O campo título é obrigatório" });
  }
  next();
});

app.use("/tarefas", require("./routes/tarefas"));

app.use(function(err, req, res, next) {
  console.error("Erro:", err.message);
  res.status(500).json({ erro: "Erro interno do servidor" });
});

app.listen(3001, function() {
  console.log("API rodando em http://localhost:3001");
});