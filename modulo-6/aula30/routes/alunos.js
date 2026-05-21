const express      = require("express");
const router       = express.Router();
const controller   = require("../controllers/alunosController");
const autenticar   = require("../middlewares/auth");
const apenasAdmin  = require("../middlewares/admin");

// Qualquer autenticado pode listar
router.get("/", autenticar, controller.listar);

// Só admin pode criar, atualizar e deletar
router.post  ("/",    autenticar, apenasAdmin, controller.criar);
router.put   ("/:id", autenticar, apenasAdmin, controller.atualizar);
router.delete("/:id", autenticar, apenasAdmin, controller.deletar);

module.exports = router;