const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const users = []; // Simulando um banco de dados temporário

// Rota de registro de usuário
router.post("/register", async (req, res) => {
  const { nome, email, senha } = req.body;

  // Verifica se o e-mail já existe
  const usuarioExistente = users.find((user) => user.email === email);
  if (usuarioExistente) {
    return res.status(400).json({ message: "E-mail já cadastrado!" });
  }

  // Criptografa a senha
  const senhaHash = await bcrypt.hash(senha, 10);
  const novoUsuario = { id: users.length + 1, nome, email, senha: senhaHash };

  users.push(novoUsuario);
  res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
});

// Rota de login
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const usuario = users.find((user) => user.email === email);
  if (!usuario) {
    return res.status(400).json({ message: "Usuário não encontrado!" });
  }

  // Verifica a senha
  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta) {
    return res.status(401).json({ message: "Senha incorreta!" });
  }

  // Gera um token JWT
  const token = jwt.sign({ id: usuario.id, email: usuario.email }, "segredo", { expiresIn: "1h" });

  res.json({ message: "Login realizado com sucesso!", token });
});

module.exports = router;
