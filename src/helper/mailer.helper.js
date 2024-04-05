import nodemailer from 'nodemailer'

export const sendEmail = async ({ email, userID, emailType }) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: process.env.SMTP_USERID,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const info = await transporter.sendMail({
            from: "admin",
            to: email,
            subject: emailType ==='VERIFY'?'Verify Your Email ':'Reset Password',
            html: "<b>Hello world?</b>",
        });
        console.log("Message sent: %s", info.messageId);
    }
    catch (error) {
        console.log("Error occurred while sending mail ");
    }

}