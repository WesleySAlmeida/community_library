const Database = require('better-sqlite3');

let db;

try {
  db = new Database('library_db.sqlite');
  console.log('Banco aberto com sucesso!');
} catch (err) {
  console.error('Erro ao abrir o banco de dados:', err.message);
}

module.exports = db;
