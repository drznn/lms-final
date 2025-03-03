const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const users = []; // Simulando um banco de dados temporário

// 🟢 Função auxiliar para registrar logs no terminal
const logRequest = (message, data = null) => {
  console.log("🔹 " + message);
  if (data) console.log("📩 Dados recebidos:", data);
};

// Rota de registro de usuário
router.post("/register", async (req, res) => {
  logRequest("Recebendo requisição de registro...", req.body);

  const { nome, email, senha } = req.body;

  // Valida se os campos estão preenchidos
  if (!nome || !email || !senha) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
  }

  // Verifica se o e-mail já existe
  const usuarioExistente = users.find((user) => user.email === email);
  if (usuarioExistente) {
    return res.status(400).json({ message: "E-mail já cadastrado!" });
  }

  try {
    // Criptografa a senha antes de salvar
    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = { id: users.length + 1, nome, email, senha: senhaHash };

    users.push(novoUsuario);

    logRequest("Novo usuário cadastrado com sucesso!", { id: novoUsuario.id, email: novoUsuario.email });

    return res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.error("❌ Erro ao registrar usuário:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Rota de login
router.post("/login", async (req, res) => {
  logRequest("Recebendo requisição de login...", req.body);

  const { email, senha } = req.body;

  // Valida se os campos estão preenchidos
  if (!email || !senha) {
    return res.status(400).json({ message: "E-mail e senha são obrigatórios!" });
  }

  const usuario = users.find((user) => user.email === email);
  if (!usuario) {
    return res.status(400).json({ message: "Usuário não encontrado!" });
  }

  // Verifica a senha
  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta) {
    return res.status(401).json({ message: "Senha incorreta!" });
  }

  try {
    // Gera um token JWT seguro
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      "segredo", // 🔴 Idealmente, mova isso para um arquivo .env
      { expiresIn: "1h" }
    );

    logRequest("Usuário logado com sucesso!", { id: usuario.id, email: usuario.email });

    return res.json({ message: "Login realizado com sucesso!", token });
  } catch (error) {
    console.error("❌ Erro ao gerar token:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
});

module.exports = router;
