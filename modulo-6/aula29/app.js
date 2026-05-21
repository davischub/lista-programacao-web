require("dotenv").config();
const express  = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Log customizado
app.use(function(req, res, next) {
  console.log("[" + new Date().toLocaleTimeString() + "] " + req.method + " " + req.url);
  next();
});

// Rotas
app.use("/alunos", require("./routes/alunos"));

// Erro global
app.use(function(err, req, res, next) {
  res.status(500).json({ erro: err.message });
});

// Conecta ao MongoDB e inicia servidor
mongoose.connect(process.env.MONGO_URI)
  .then(function() {
    console.log("MongoDB conectado!");
    app.listen(process.env.PORT, function() {
      console.log("API rodando em http://localhost:" + process.env.PORT);
    });
  })
  .catch(function(err) {
    console.log("Erro ao conectar:", err.message);
  });