//setup for send OTP to the mail
const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try{
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.eventNames.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })

        let info = await transporter.sendMail({
            from:'StudyDesk - by Aastha',
            to:`${email}`,
            subject: `${title}`,
            html:`${body}`,
        })
        console.log(info);
        return info;

    }
    catch(error) {
        console.log(error.message);
    }
}

module.exports = mailSender;