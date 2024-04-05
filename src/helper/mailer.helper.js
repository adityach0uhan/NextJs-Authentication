import nodemailer from 'nodemailer'

export const sendMail = async ({ email, username, emailType }) => {
    

    try {
        
        const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user:SMTP_USERID,
                pass:SMTP_PASSWORD,
            },
        });

    } catch (error) {
        console.log("Error occurred while sending mail ");
    }
    
}