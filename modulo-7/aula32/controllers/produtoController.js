const Produto = require("../models/Produto");

exports.listar = async function(req, res, next) {
  try {
    const { categoria, ordem, pagina = 1, limite = 10, busca } = req.query;
    const filtro = { ativo: true };
    if (categoria) filtro.categoria = categoria;

    // Desafio: busca por texto no nome
    if (busca) filtro.nome = { $regex: busca, $options: "i" };

    const produtos = await Produto.find(filtro)
      .sort(ordem === "preco" ? { preco: 1 } : { createdAt: -1 })
      .skip((pagina - 1) * limite)
      .limit(Number(limite));

    const total = await Produto.countDocuments(filtro);
    res.json({ produtos, total, pagina: Number(pagina), paginas: Math.ceil(total / limite) });
  } catch (err) { next(err); }
};

exports.buscar = async function(req, res, next) {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });
    res.json(produto);
  } catch (err) { next(err); }
};

exports.criar = async function(req, res, next) {
  try {
    req.body.criadoPor = req.userId;
    const produto = await Produto.create(req.body);
    res.status(201).json(produto);
  } catch (err) { next(err); }
};

exports.atualizar = async function(req, res, next) {
  try {
    const produto = await Produto.findByIdAndUpdate(
      req.params.id, req.body,
      { new: true, runValidators: true }
    );
    if (!produto) return res.status(404).json({ erro: "Não encontrado" });
    res.json(produto);
  } catch (err) { next(err); }
};

exports.remover = async function(req, res, next) {
  try {
    const produto = await Produto.findByIdAndDelete(req.params.id);
    if (!produto) return res.status(404).json({ erro: "Não encontrado" });
    res.status(204).send();
  } catch (err) { next(err); }
};