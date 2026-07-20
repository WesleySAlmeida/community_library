import cron from 'node-cron'
import moment from 'moment'
import {findUserByIdRepository} from '../repositories/user.repositories.js'
import bookRepository from '../repositories/book.repositories.js'
import loanRepository from '../repositories/loan.repositories.js'
import sendEmail from './email.service.js'

cron.schedule('1 * * * *', async ()=> {
    console.log("Running daily job to check for due dates...")
    const loans = await loanRepository.findAllLoanRepository()
    const today = moment().startOf('day')

    loans.forEach(async (loan) =>{
        const dueDate = moment(loan.dueDate).startOf('day')
        const remiderDueDate = moment(dueDate).subtract(1, 'days')
        if(today.isSame(remiderDueDate)){
            sendEmail(userLoan.email, bookLoan.title, loan.dueDate)
        }

    })
})