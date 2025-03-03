const express = require("express");
let feiras = require("../models/feiras"); // Mantido como let para possibilitar remoções
const router = express.Router();

// 🟢 **Listar Feiras**
router.get("/", (req, res) => {
    res.json(feiras);
});

// 🟢 **Criar Feira**
router.post("/", (req, res) => {
    const { nome, local, data } = req.body;

    if (!nome || !local || !data) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
    }

    // Gerar um novo ID baseado no maior ID atual
    const novoId = feiras.length > 0 ? Math.max(...feiras.map(f => f.id)) + 1 : 1;
    const novaFeira = { id: novoId, nome, local, data };
    
    feiras.push(novaFeira);

    res.status(201).json({ message: "Feira adicionada com sucesso!", feira: novaFeira });
});

// 🟢 **Editar Feira**
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nome, local, data } = req.body;

    const feiraIndex = feiras.findIndex(f => f.id == id);
    if (feiraIndex === -1) {
        return res.status(404).json({ message: "Feira não encontrada!" });
    }

    // Atualiza apenas os campos fornecidos
    if (nome) feiras[feiraIndex].nome = nome;
    if (local) feiras[feiraIndex].local = local;
    if (data) feiras[feiraIndex].data = data;

    res.json({ message: "Feira atualizada com sucesso!", feira: feiras[feiraIndex] });
});

// 🟢 **Deletar Feira**
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    
    const feiraIndex = feiras.findIndex(f => f.id == id);
    if (feiraIndex === -1) {
        return res.status(404).json({ message: "Feira não encontrada!" });
    }

    feiras.splice(feiraIndex, 1); // Remove a feira do array sem reatribuir a variável

    res.json({ message: "Feira deletada com sucesso!" });
});

module.exports = router;
