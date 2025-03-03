# 📌 Gestão de Feiras - Sistema de Cadastro e Gerenciamento de Feiras

## 📖 Sobre o Projeto
O **Gestão de Feiras** é um sistema completo para gerenciamento de feiras, permitindo que os usuários cadastrem, editem e excluam eventos. O sistema conta com autenticação de usuários e uma interface moderna para facilitar a navegação e interação com as feiras cadastradas.

## 🚀 Funcionalidades Principais
- **Cadastro e login de usuários**
- **Persistência de sessão** (usuário permanece logado até sair manualmente)
- **Adição, edição e exclusão de feiras**
- **Pesquisa dinâmica** (busca em tempo real por nome, local ou data)
- **Interface responsiva e intuitiva**
- **Modais para confirmação de exclusão e edição de feiras**
- **Exibição das feiras cadastradas com data formatada para o padrão brasileiro (dd/mm/aaaa)**
- **Sistema de logout que registra a saída do usuário no backend**

---

## 🏗️ Estrutura do Projeto

```
├── backend/
│   ├── models/
│   │   ├── feiras.js   # Dados mockados de feiras
│   ├── routes/
│   │   ├── authRoutes.js   # Lógica de autenticação
│   │   ├── feiraRoutes.js  # CRUD de feiras
│   ├── server.js   # Configuração do servidor Express
│
├── frontend/
│   ├── pages/
│   │   ├── login.html   # Página de login
│   │   ├── register.html # Página de registro
│   ├── css/
│   │   ├── style.css   # Estilização geral do sistema
│   ├── js/
│   │   ├── main.js  # Lógica da tela principal (CRUD de feiras)
│   │   ├── login.js  # Lógica de autenticação no frontend
│   ├── index.html   # Página inicial com listagem de feiras
│
├── README.md   # Documentação do projeto
└── package.json  # Dependências do projeto
```

---

## 🛠️ Tecnologias Utilizadas
### **Frontend:**
- HTML, CSS e JavaScript puro
- Font Awesome (ícones para edição e exclusão)
- Modais personalizados

### **Backend:**
- Node.js e Express.js
- Armazenamento em memória (mock de banco de dados para feiras e usuários)

---

## 🖥️ Configuração do Projeto
### **1️⃣ Clone o Repositório**
```bash
git clone https://github.com/seu-usuario/gestao-feiras.git
cd gestao-feiras
```

### **2️⃣ Instale as Dependências**
```bash
npm install
```

### **3️⃣ Inicie o Servidor Backend**
```bash
node backend/server.js
```

### **4️⃣ Inicie o Frontend**
Basta abrir o `index.html` no navegador ou usar um servidor local:
```bash
npx live-server frontend/
```

---

## 🔑 Autenticação de Usuários
O sistema permite:
- Cadastro de usuários (`/auth/register`)
- Login e geração de token (`/auth/login`)
- Verificação de sessão (`/auth/me`)
- Logout com log registrado (`/auth/logout`)

---

## 📝 Cadastro e Gerenciamento de Feiras
O sistema permite:
- **Listar feiras** (`GET /feiras`)
- **Criar nova feira** (`POST /feiras`)
- **Editar uma feira existente** (`PUT /feiras/:id`)
- **Excluir uma feira** (`DELETE /feiras/:id` com modal de confirmação)

---

## 📌 Melhorias Implementadas
✅ Pesquisa dinâmica por nome, local ou data
✅ Interface melhorada com botões estilizados
✅ Persistência do nome do usuário na tela inicial
✅ Exibição correta da data no formato brasileiro (dd/mm/aaaa)
✅ Registro de logout no backend
✅ Modais para edição e exclusão de feiras
✅ Adição de 20 feiras mockadas no banco de dados
✅ Correção de bugs no login/logout

---

## 🚀 Próximos Passos
🔹 Persistência de dados em um banco de dados real (MongoDB ou PostgreSQL)
🔹 Implementação de um painel administrativo para gerenciar usuários
🔹 Responsividade aprimorada para mobile

---

## 📌 Considerações Finais
Este projeto foi desenvolvido com foco em aprendizado e aprimoramento de habilidades em **Node.js, Express, JavaScript e manipulação de DOM no frontend**. Caso queira contribuir ou relatar bugs, sinta-se à vontade para abrir uma issue! 🎯

---

## 📌 Autor
👨‍💻 Desenvolvido por [Seu Nome Aqui] - Engenheiro de Software 🚀

