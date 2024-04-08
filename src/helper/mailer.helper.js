import nodemailer from 'nodemailer';
import userModel from '@/model/userModel';
import bcryptjs from 'bcryptjs'
import dotenv from 'dotenv';
dotenv.config();
export default async function sendEmail({ email, userID, emailType }) {
    try {
        if (emailType === 'VERIFY') {

            const hashedToken = await bcryptjs.hash(String(userID), 10);
            userModel.findByIdAndUpdate(userID, {
                verifyUserToken: hashedToken,
                verifyUserTokenExpiry: Date.now() + 3600000,
            })

        } else if (emailType === 'RESET') {
            const hashedToken = await bcryptjs.hash(userID.toString(), 10); console.log("Hashed Token :", hashedToken);

            userModel.findByIdAndUpdate(userID, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            })
        }

        const transporter = await nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USERID,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const info = await transporter.sendMail({
            from: "Aditya Chauhan",
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify Your Email ' : 'Reset Password',
            html: ``,
        });
        console.log("Message sent: %s", info.messageId);

    }
    catch (error) {
        console.log("Error occurred while sending mail ", error);
    }

}