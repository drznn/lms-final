document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const errorMessage = document.getElementById("login-error");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("password").value; // Corrigido para "password"

        errorMessage.style.display = "none"; // Esconde mensagem de erro ao tentar novamente

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

            // ✅ Salva o token no localStorage
            localStorage.setItem("token", data.token);

            // ✅ Redireciona para a página principal após o login
            window.location.href = "../index.html";
        } catch (error) {
            console.error("Erro no login:", error);
            errorMessage.textContent = error.message;
            errorMessage.style.display = "block";
        }
    });

    // 🔹 Redireciona para a página de cadastro ao clicar em "Criar Conta"
    document.getElementById("register-link").addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "register.html";
    });
});
