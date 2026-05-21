require("dotenv").config();
const express  = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

app.use(function(req, res, next) {
  console.log("[" + new Date().toLocaleTimeString() + "] " + req.method + " " + req.url);
  next();
});

app.use("/auth",   require("./routes/auth"));
app.use("/alunos", require("./routes/alunos"));

mongoose.connect(process.env.MONGO_URI)
  .then(function() {
    console.log("MongoDB conectado!");
    app.listen(process.env.PORT, function() {
      console.log("API rodando em http://localhost:" + process.env.PORT);
    });
  })
  .catch(function(err) {
    console.log("Erro:", err.message);
  });