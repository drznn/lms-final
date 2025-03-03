document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    const nomeInput = document.getElementById("nome");
    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("senha");
    const errorMessage = document.getElementById("register-error");
    const loginLink = document.getElementById("login-link");

    // ✅ Verificação para evitar erros caso elementos não sejam encontrados
    if (!registerForm || !nomeInput || !emailInput || !senhaInput || !loginLink || !errorMessage) {
        console.error("❌ ERRO: Elementos do formulário não foram encontrados.");
        return;
    }

    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();
        const senha = senhaInput.value.trim();

        errorMessage.style.display = "none";

        if (!nome || !email || !senha) {
            errorMessage.textContent = "Preencha todos os campos!";
            errorMessage.style.display = "block";
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, email, senha }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erro ao criar conta");
            }

            alert("Conta criada com sucesso! Redirecionando para login...");
            window.location.href = "login.html";
        } catch (error) {
            console.error("❌ Erro no cadastro:", error);
            errorMessage.textContent = error.message;
            errorMessage.style.display = "block";
        }
    });

    // 🔹 Redirecionamento para login
    loginLink.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "login.html";
    });
});
