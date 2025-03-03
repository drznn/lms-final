document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");

    // 🔴 Se o usuário não estiver autenticado, redireciona para login
    if (!token) {
        window.location.href = "pages/login.html";
        return;
    }

    // 🟢 Buscar dados do usuário logado
    try {
        const response = await fetch("http://localhost:5000/auth/me", {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const userData = await response.json();

        if (response.ok) {
            const firstName = userData.nome.split(" ")[0]; // Pegando o primeiro nome
            console.log("Nome do usuário:", firstName); // Log para depuração
            document.getElementById("user-name").textContent = `Olá, ${firstName}`;
        } else {
            console.error("Erro ao buscar usuário:", userData.message);
        }
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
    }

    // 🟢 Botão de Logout
    document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "pages/login.html";
    });

    // 🟢 Buscar Feiras no Backend
    try {
        const response = await fetch("http://localhost:5000/feiras", {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const feiras = await response.json();
        const feirasContainer = document.getElementById("feiras-list");

        feirasContainer.innerHTML = ""; // Limpa antes de adicionar os cards

        feiras.forEach(feira => {
            const feiraCard = document.createElement("div");
            feiraCard.classList.add("feira-card");
            feiraCard.innerHTML = `
                <h3>${feira.nome}</h3>
                <p><strong>Local:</strong> ${feira.local}</p>
                <p><strong>Data:</strong> ${feira.data}</p>
            `;
            feirasContainer.appendChild(feiraCard);
        });
    } catch (error) {
        console.error("Erro ao carregar feiras:", error);
    }
});
