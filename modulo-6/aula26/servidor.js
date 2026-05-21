const http = require("http");
const fs   = require("fs");

const servidor = http.createServer(function(req, res) {

  if (req.url === "/" || req.url === "/home") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h1>Servidor Node funcionando!</h1><p>Acesse <a href='/alunos'>/alunos</a></p>");
    return;
  }

  if (req.url === "/alunos") {
    const dados = fs.readFileSync("./dados.json", "utf-8");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(dados);
    return;
  }

  res.writeHead(404);
  res.end("Página não encontrada");
});

servidor.listen(3000, function() {
  console.log("Servidor rodando em http://localhost:3000");
});