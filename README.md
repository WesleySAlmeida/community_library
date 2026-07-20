# 📚 Community Library

Sistema de gerenciamento de uma **biblioteca comunitária**, onde usuários podem cadastrar livros, realizar empréstimos e receber **lembretes automáticos por e-mail** sobre a devolução.

O projeto foi desenvolvido em **Node.js** com **Express**, **SQLite**, **JWT** para autenticação e **Brevo SMTP** para envio de e-mails.

---

## 📦 Instalação

### 🔧 Pré-requisitos

- Node.js (v16 ou superior)
- npm ou yarn
- SQLite (já integrado ao projeto)

### 🚀 Passos para Instalação

#### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/community-library.git
```

#### 2. Acesse o diretório do projeto

```bash
cd community-library
```

#### 3. Instale as dependências

Com npm:

```bash
npm install
```

Ou com yarn:

```bash
yarn install
```

#### 4. Configure o arquivo `.env`

Crie um arquivo `.env` na raiz do projeto contendo:

```env
PORT=3000
SECRET=your_jwt_secret
BREVO_SMTP_USER=b24bd6001@smtp-brevo.com
BREVO_SMTP_PASS=your_smtp_password
BREVO_SMTP_HOST=smtp-relay.brevo.com
BREVO_SMTP_PORT=587
```

> **Importante:** Nunca compartilhe credenciais reais em repositórios públicos. Utilize variáveis de ambiente seguras.

#### 5. Gere uma chave secreta JWT

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copie o valor gerado e substitua o conteúdo da variável:

```env
SECRET=sua_chave_gerada
```

#### 6. Inicie o servidor

Com npm:

```bash
npm start
```

Ou com yarn:

```bash
yarn start
```

#### 7. Acesse a aplicação

```text
http://localhost:3000
```

---

## 🖥️ Uso

### Autenticação

O sistema utiliza **JWT (JSON Web Token)** para proteger as rotas da aplicação.

Após realizar o login, envie o token no header das requisições:

```http
Authorization: Bearer <seu_token>
```

### Rotas Principais

| Método | Rota | Descrição |
|-------|------|-----------|
| GET, POST, PUT e DELETE | `/users` | CRUD de usuários |
| GET, POST, PUT e DELETE | `/books` | CRUD de livros |
| GET, POST e DELETE | `/loans` | CRUD de empréstimos |

### Exemplo de Requisição

Criando um novo usuário:

```bash
curl -X POST http://localhost:3000/users \
-H "Content-Type: application/json" \
-d '{"name":"Wesley Almeida","email":"wesley@gmail.com","password":"123456"}'
```

---

## 📧 Lembretes Automáticos

O sistema envia automaticamente um e-mail de lembrete **um dia antes da data prevista para devolução do livro**.

A funcionalidade utiliza:

- Node-cron
- Moment.js
- Nodemailer
- Brevo SMTP

### Exemplo do Agendamento

```javascript
cron.schedule("0 9 * * *", async () => {
  console.log("Running daily job to check for due dates...");

  const loans = await loanRepository.findAllLoanRepository();
  const today = moment().startOf("day");

  loans.forEach(async (loan) => {
    const dueDate = moment(loan.dueDate).startOf("day");
    const reminderDueDate = moment(dueDate).subtract(1, "days");

    const userLoan = await findUserByIdRepository(loan.userId);
    const bookLoan = await bookRepository.findBookByIdRepository(
      loan.bookId
    );

    if (today.isSame(reminderDueDate)) {
      await sendEmail(
        userLoan.email,
        bookLoan.title,
        loan.dueDate
      );

      console.log(
        `Lembrete enviado para ${userLoan.email}`
      );
    }
  });
});
```

---

## 📂 Estrutura do Projeto

```text
community-library/
├── src/
│   ├── repositories/
│   │   ├── user.repositories.js
│   │   ├── book.repositories.js
│   │   └── loan.repositories.js
│   │
│   ├── routes/
│   │   ├── user.routes.js
│   │   ├── book.routes.js
│   │   └── loan.routes.js
│   │
│   ├── service/
│   │   ├── email.service.js
│   │   └── cron.service.js
│   │
│   ├── middleware/
│   │   └── auth.middleware.js
│   │
│   └── index.js
│
├── .env.example
├── package.json
└── README.md
```

---

## 🚀 Tecnologias Utilizadas

- Node.js
- Express.js
- SQLite
- JSON Web Token (JWT)
- Zod
- Nodemailer
- Brevo SMTP
- Node-cron
- Moment.js

---

## 🤝 Contribuição

Contribuições são sempre bem-vindas!

### Como contribuir

1. Faça um fork do projeto.

2. Crie uma branch para sua feature:

```bash
git checkout -b minha-feature
```

3. Faça suas alterações e realize o commit:

```bash
git commit -m "Adiciona nova funcionalidade"
```

4. Envie as alterações para o repositório remoto:

```bash
git push origin minha-feature
```

5. Abra um Pull Request.

---

## 📖 Licença

Este projeto possui caráter **comunitário e educacional**, sendo livre para estudos, utilização e adaptações.

---

## 📝 Exemplo de Log Esperado

```bash
Running daily job to check for due dates...
Lembrete enviado para usuario@gmail.com
```

---

### Desenvolvido utilizando Node.js, Express e SQLite.