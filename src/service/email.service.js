 import nodemailer from 'nodemailer'

 const transporter = nodemailer.createTransport({
    host: process.env.BREVO_SMTP_HOST,
    port: process.env.BREVO_SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASS,
  },
});

 function sendEmail(email, bookTitle, dueDate){
    const mailOptions = {
        from: 'sw.almeida09@gmail.com',
        to: email,
        subject: 'Reminder: Book Due Date Approaching',
        html: `
             <div style="font-family: Arial, sans-serif; color: #333; font-size: 16px;">
                <h2>Lembrete da Biblioteca Comunitária</h2>
                <p>Olá,</p>                                                 
                <p>Este é um lembrete para a devolução do livro "${bookTitle}".</p>
                <p>Data de devolução: ${dueDate}</p>
                <p>Por favor, devolva o livro até a data indicada.</p>
                <p>Obrigado por utilizar nossa biblioteca!</p>
            </div>
        `
    }

    transporter.sendEmail(mailOptions, (err, info) => {
        if(err){
            console.error('Error sendinf email:', err)
        }else {
            console.log('Email sent:', info.response)
        }
    })
 }



export default sendEmail