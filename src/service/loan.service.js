import loanRepositories from "../repositories/loan.repositories.js"

async function createLoanService(userId, bookId, dueDate){
    const createdLoan = await loanRepositories.createLoanRepository(
        userId,
        bookId,
        dueDate
    )
    if(!createdLoan) throw new Error ("Error creating Loan")
    return createdLoan
}

async function findAllLoansService() {
    const loans = await loanRepositories.findAllLoanRepository()
    return loans
}

async function findLoanByIdService(loanId){
    const loan = loanRepositories.findLoanByIdRepository(loanId);
    if(!loan) throw new Error("Loan not found")
    return loan
}

async function deleteLoanService(loanId, userId){
    const loan = await loanRepositories.findLoanByIdRepository(loanId)
    if(!loan) throw new Error("Loan not found")
    if(!loan.userId !== userId) throw new Error("Unauthorized") 
    const response = await loanRepositories.deleteLoanRepository(loanId)
    return response
}

export default {
    createLoanService,
    findAllLoansService,
    findLoanByIdService,
    deleteLoanService
}