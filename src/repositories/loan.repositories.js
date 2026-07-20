import db from "../config/database.js";

db.exec(`
    CREATE TABLE IF NOT EXISTS loans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        bookId INTEGER,
        dueDate DATE,
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (bookId) REFERENCES books(id)
    )
`);

function createLoanRepository(userId, bookId, dueDate) {
    try {
        const stmt = db.prepare(`
            INSERT INTO loans (userId, bookId, dueDate)
            VALUES (?, ?, ?)
        `);

        const info = stmt.run(userId, bookId, dueDate);

        return {
            id: info.lastInsertRowid,
            userId,
            bookId,
            dueDate
        };
    } catch (err) {
        throw new Error("Erro ao criar empréstimo: " + err.message);
    }
}

function findAllLoanRepository() {
    try {
        const stmt = db.prepare(`
            SELECT loans.id, loans.dueDate, users.email, books.title
            FROM loans 
            JOIN users ON loans.userId = users.id
            JOIN books ON loans.bookId = books.id
        `);

        const rows = stmt.all();
        return rows;
    } catch (error) {
        throw new Error("Erro ao buscar empréstimos: " + error.message);
    }
}

function findLoanByIdRepository(loanId) {
    try {
        const stmt = db.prepare(`
            SELECT * FROM loans
            WHERE id = ?
        `);

        const loan = stmt.get(loanId);
        return loan;
    } catch (error) {
        throw new Error("Erro ao buscar empréstimo: " + error.message);
    }
}

function deleteLoanRepository(loanId) {
    try {
        const stmt = db.prepare(`
            DELETE FROM loans
            WHERE id = ?
        `);

        const result = stmt.run(loanId);
        return result.changes > 0; // retorna true se deletou algo
    } catch (error) {
        throw new Error("Erro ao deletar empréstimo: " + error.message);
    }
}

export default {
    createLoanRepository,
    findAllLoanRepository,
    findLoanByIdRepository,
    deleteLoanRepository
};
