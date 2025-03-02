require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/authRoutes");
const feiraRoutes = require("./routes/feiraRoutes");

// Configuração do servidor
app.use("/feiras", feiraRoutes);
app.use("/auth", authRoutes);
app.use(cors());
app.use(express.json());

// Rota básica para testar se o backend está rodando
app.get("/", (req, res) => {
  res.send("API do Sistema de Gestão de Feiras Locais rodando...");
});

// Inicia o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
