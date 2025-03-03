document.addEventListener("DOMContentLoaded", () => {
    // 🔹 Pegando elementos do formulário
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("password");
    const errorMessage = document.getElementById("login-error");
    const registerLink = document.getElementById("register-link");

    // ✅ Verificação de existência de elementos
    if (!loginForm || !emailInput || !senhaInput || !registerLink || !errorMessage) {
        console.error("❌ ERRO: Elementos do formulário não foram encontrados. Verifique o HTML.");
        return;
    }

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = emailInput.value.trim();
        const senha = senhaInput.value.trim();

        errorMessage.style.display = "none";

        if (!email || !senha) {
            errorMessage.textContent = "Preencha todos os campos!";
            errorMessage.style.display = "block";
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erro ao fazer login");
            }

            // ✅ Salva o token e redireciona
            localStorage.setItem("token", data.token);
            window.location.href = "../index.html";
        } catch (error) {
            console.error("❌ Erro no login:", error);
            errorMessage.textContent = error.message;
            errorMessage.style.display = "block";
        }
    });

    registerLink.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "register.html";
    });
});
