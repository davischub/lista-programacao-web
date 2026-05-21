const bcrypt  = require("bcryptjs");
const jwt     = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

async function registrar(req, res) {
  try {
    const { nome, email, senha, role } = req.body;
    const existe = await Usuario.findOne({ email });
    if (existe) return res.status(400).json({ erro: "Email já cadastrado" });

    const usuario = await Usuario.create({ nome, email, senha, role });
    res.status(201).json({ mensagem: "Usuário criado!", id: usuario._id });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(401).json({ erro: "Email ou senha inválidos" });

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) return res.status(401).json({ erro: "Email ou senha inválidos" });

    const token = jwt.sign(
      { id: usuario._id, nome: usuario.nome, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ token, role: usuario.role });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

module.exports = { registrar, login };