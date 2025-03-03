document.addEventListener("DOMContentLoaded", async () => {
    const feirasContainer = document.getElementById("feiras-list");
    const addFeiraBtn = document.getElementById("add-feira-btn");

    let todasAsFeiras = [];

    // 🟢 Função para formatar a data no formato brasileiro (dd/mm/aaaa)
    function formatarData(dataISO) {
        if (!dataISO) return ""; // Evita erros se a data estiver indefinida
        const data = new Date(dataISO);
        const dia = String(data.getDate() + 1).padStart(2, "0");
        const mes = String(data.getMonth() + 1).padStart(2, "0");
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    // 🟢 Buscar Feiras no Backend
    async function carregarFeiras() {
        try {
            const response = await fetch("http://localhost:5000/feiras");
            todasAsFeiras = await response.json();
            renderizarFeiras(todasAsFeiras);
        } catch (error) {
            console.error("Erro ao carregar feiras:", error);
        }
    }

    carregarFeiras();

    // 🟢 Renderiza Feiras
    function renderizarFeiras(feiras) {
        feirasContainer.innerHTML = "";
        feiras.forEach(feira => {
            const feiraCard = document.createElement("div");
            feiraCard.classList.add("feira-card");
            feiraCard.innerHTML = `
                <h3>${feira.nome}</h3>
                <p><strong>Local:</strong> ${feira.local}</p>
                <p><strong>Data:</strong> ${formatarData(feira.data)}</p>
                <div class="card-actions hidden">
                    <i class="fas fa-edit edit-feira" data-id="${feira.id}"></i>
                    <i class="fas fa-trash delete-feira" data-id="${feira.id}"></i>
                </div>
            `;

            feiraCard.addEventListener("click", () => {
                feiraCard.querySelector(".card-actions").classList.toggle("hidden");
            });

            feirasContainer.appendChild(feiraCard);
        });

        // Atualiza os eventos de clique para edição e exclusão
        document.querySelectorAll(".edit-feira").forEach(btn => {
            btn.removeEventListener("click", abrirEdicao);
            btn.addEventListener("click", abrirEdicao);
        });

        document.querySelectorAll(".delete-feira").forEach(btn => {
            btn.removeEventListener("click", abrirConfirmacaoDelecao);
            btn.addEventListener("click", abrirConfirmacaoDelecao);
        });
    }

    // 🟢 Modal de Edição
    function abrirEdicao(event) {
        event.stopPropagation();
        const feiraId = event.target.dataset.id;
        const feira = todasAsFeiras.find(f => f.id == feiraId);

        document.getElementById("edit-nome").value = feira.nome;
        document.getElementById("edit-local").value = feira.local;
        document.getElementById("edit-data").value = feira.data;

        const modalEdit = document.getElementById("modal-edit");
        modalEdit.style.display = "block";

        // Salvar alterações
        document.getElementById("save-edit").onclick = async () => {
            const dadosEditados = {
                nome: document.getElementById("edit-nome").value,
                local: document.getElementById("edit-local").value,
                data: document.getElementById("edit-data").value
            };

            await fetch(`http://localhost:5000/feiras/${feiraId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dadosEditados)
            });

            carregarFeiras();
            modalEdit.style.display = "none";
        };

        // Botão "Cancelar" fecha o modal de edição
        document.getElementById("cancel-edit").onclick = () => {
            modalEdit.style.display = "none";
        };
    }

    // 🟢 Modal de Confirmação de Exclusão
    function abrirConfirmacaoDelecao(event) {
        event.stopPropagation();
        const feiraId = event.target.dataset.id;
        document.getElementById("modal-delete").style.display = "block";

        document.getElementById("confirm-delete").onclick = async () => {
            await fetch(`http://localhost:5000/feiras/${feiraId}`, { method: "DELETE" });
            carregarFeiras();
            document.getElementById("modal-delete").style.display = "none";
        };

        // Botão "Cancelar" fecha o modal de exclusão
        document.getElementById("cancel-delete").onclick = () => {
            document.getElementById("modal-delete").style.display = "none";
        };
    }

    // 🟢 **Adicionar Nova Feira**
    addFeiraBtn.addEventListener("click", () => {
        document.getElementById("modal-add").style.display = "block";
    });

    document.getElementById("save-add").addEventListener("click", async () => {
        const novaFeira = {
            nome: document.getElementById("add-nome").value,
            local: document.getElementById("add-local").value,
            data: document.getElementById("add-data").value
        };

        await fetch("http://localhost:5000/feiras", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novaFeira)
        });

        carregarFeiras();
        document.getElementById("modal-add").style.display = "none";
    });

    // Botão "Cancelar" fecha o modal de adição de feira
    document.getElementById("cancel-add").addEventListener("click", () => {
        document.getElementById("modal-add").style.display = "none";
    });
});
