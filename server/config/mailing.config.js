const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'shappycrew@gmail.com',
        pass: 'shappyCrew10'
    }
})

module.exports = transporter