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

export function findUserByIdRepository(id) {
  try {
    const stmt = db.prepare(`
      SELECT id, username, email, password, avatar
      FROM users
      WHERE id = ?
    `);

    const user = stmt.get(id); // retorna um único registro
    return user;
  } catch (err) {
    throw new Error("Erro ao buscar usuário: " + err.message);
  }
}

export function findAllUserRepository() {
  try {
    const stmt = db.prepare(`
      SELECT id, username, email, avatar FROM users
    `);

    const rows = stmt.all(); // retorna todos os registros
    return rows;
  } catch (err) {
    throw new Error("Erro ao buscar usuários: " + err.message);
  }
}

export function updateUserRepository(id, user) {
  const fields = ["username", "email", "password", "avatar"];
  const updates = [];
  const values = [];

  fields.forEach((field) => {
    if (user[field] !== undefined) {
      updates.push(`${field} = ?`);
      values.push(user[field]); // aqui vai o valor, não o objeto inteiro
    }
  });

  if (updates.length === 0) {
    throw new Error("Nenhum campo válido para atualizar");
  }

  const query = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;
  values.push(id);

  console.log("Query gerada:", query);
  console.log("Valores:", values);

  const stmt = db.prepare(query);
  const result = stmt.run(...values);

  return { changes: result.changes, id, ...user };
}




export function deleteUserRepository(id) {
  try {
    const stmt = db.prepare(`
      DELETE FROM users
      WHERE id = ?
    `);

    const result = stmt.run(id);

    // Retorna quantas linhas foram afetadas
    return { changes: result.changes, id };
  } catch (err) {
    throw new Error("Erro ao deletar usuário: " + err.message);
  }
}

