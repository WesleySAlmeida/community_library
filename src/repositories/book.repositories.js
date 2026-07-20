import db from "../config/database.js";

db.exec(`
    CREATE TABLE IF NOT EXISTS books(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        userId INTEGER,
        FOREIGN KEY (userId) REFERENCES users(id)
    )`);

function createBookRepository(newBook, userId){
     const { title, author } = newBook;

    try {
        const stmt = db.prepare(`
            INSERT INTO books (title, author, userId)
            VALUES (?, ?, ?)
        `);

        const info = stmt.run(title, author, userId);

        return { id: info.lastInsertRowid, ...newBook };
    } catch (err) {
        throw new Error("Erro ao criar livro: " + err.message);
    }
}

function findAllBooksRepository(){
  try {
    const stmt = db.prepare(`
      SELECT * FROM books
    `);

    const rows = stmt.all(); // retorna todos os registros
    return rows;
  } catch (err) {
    throw new Error("Erro ao buscar livros: " + err.message);
  }
}

 function findBookByIdRepository(id) {
  try {
    const stmt = db.prepare(`
      SELECT * FROM books
      WHERE id = ?
    `);

    const book = stmt.get(id); // retorna um único registro
    return book;
  } catch (err) {
    ("Erro ao buscar livro: " + err.message);
  }
}

 function updateBookRepository(bookId, updatedBook) {
  const fields = ["title", "author"];
  const updates = [];
  const values = [];

  fields.forEach((field) => {
    if (updatedBook[field] !== undefined) {
      updates.push(`${field} = ?`);
      values.push(updatedBook[field]); // aqui vai o valor, não o objeto inteiro
    }
  });

  if (updates.length === 0) {
    throw new Error("Nenhum campo válido para atualizar");
  }

  const query = `UPDATE books SET ${updates.join(", ")} WHERE id = ?`;
  values.push(bookId);

  console.log("Query gerada:", query);
  console.log("Valores:", values);

  const stmt = db.prepare(query);
  const result = stmt.run(...values);

  return { changes: result.changes, id: bookId, ...updatedBook };
}

function deleteBookRepository(id) {
  try {
    const stmt = db.prepare(`
      DELETE FROM books
      WHERE id = ?
    `);

    const result = stmt.run(id);

    // Retorna quantas linhas foram afetadas
    return { changes: result.changes, id };
  } catch (err) {
    throw new Error("Erro ao deletar livro: " + err.message);
  }
}

function searchBooksRepository(search){
  try{
    const stmt = db.prepare(`
        SELECT * FROM books 
          WHERE title LIKE ? OR author LIKE ?
        `)
    const rows = stmt.all(`%${search}%`, `%${search}%`);
    return rows;
  }catch (error){
    throw new Error("Erro ao buscar livros: " + error.message);
  }
}

export default {
    createBookRepository,
    findAllBooksRepository,
    findBookByIdRepository,
    updateBookRepository,
    deleteBookRepository,
    searchBooksRepository
}


