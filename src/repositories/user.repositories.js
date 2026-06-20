import db from "../config/database.js";

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
export function createUserRepository(newUser) {
    const { username, email, password, avatar } = newUser;

    try {
        const stmt = db.prepare(`
            INSERT INTO users (username, email, password, avatar)
            VALUES (?, ?, ?, ?)
        `);

        const info = stmt.run(username, email, password, avatar);

        return { id: info.lastInsertRowid, ...newUser };
    } catch (err) {
        throw new Error("Erro ao criar usuário: " + err.message);
    }
}

// Buscar usuário por email
export function findUserByEmailRepository(email) {
    try {
        const stmt = db.prepare(`
            SELECT id, username, email, password, avatar
            FROM users
            WHERE email = ?
        `);

        const user = stmt.get(email); // retorna um único registro
        return user;
    } catch (err) {
        throw new Error("Erro ao buscar usuário: " + err.message);
    }
}
