const db = require('../config/database');

// Criar tabela
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        avatar TEXT
    )
`);

// Função para criar usuário
function createUserRepository(newUser) {
    const { username, email, password, avatar } = newUser;

    try {
        const stmt = db.prepare(`
            INSERT INTO users (username, email, password, avatar)
            VALUES (?, ?, ?, ?)
        `);

        stmt.run(username, email, password, avatar);

        return { message: "User created successfully" };
    } catch (err) {
        throw new Error("Erro ao criar usuário: " + err.message);
    }
}

module.exports = {
    createUserRepository
};
