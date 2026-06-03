// src/config/database.js
import Database from "better-sqlite3";

let db;

try {
  db = new Database("library_db.sqlite");
  console.log("Banco aberto com sucesso!");
} catch (err) {
  console.error("Erro ao abrir o banco de dados:", err.message);
}

export default db;
