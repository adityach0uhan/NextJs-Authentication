import nodemailer from 'nodemailer';
import userModel from '@/model/userModel';
import bcryptjs from 'bcryptjs'
import dotenv from 'dotenv';
dotenv.config();
export default async function sendEmail({ email, userID, emailType }) {
    try {
        if (emailType === 'VERIFY') {
            // Get the current date and time
            const currentDate =  new Date();
            // Add 6 hours to the current date and time
            const sixHoursFromNow = new Date(currentDate.getTime() + (6 * 60 * 60 * 1000));
            const hashedToken = await bcryptjs.hash(String(userID), 10);
            console.log("Hashed Token :", hashedToken)
            userModel.findOneAndUpdate(userID, {
                verifyUserToken: hashedToken,
                verifyUserTokenExpiry: sixHoursFromNow,
            })
        } else if (emailType === 'RESET') {

            const currentDate = new Date();
            const sixHoursFromNow = new Date(currentDate.getTime() + (6 * 60 * 60 * 1000));
            const hashedToken = await bcryptjs.hash(String(userID), 10);            console.log("Hashed Token :", hashedToken)
            userModel.findOneAndUpdate(userID, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: sixHoursFromNow,
            })

        }
        console.log("Creating transporter")
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USERID,
                pass: process.env.SMTP_PASSWORD,
            },
        });
        console.log("Sending Mail")
        const info = await transporter.sendMail({
            from: "Aditya Chauhan",
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify Your Email ' : 'Reset Password',
            html: "<b>Hello this is testing email that has been sent to you </b>",
        });
        console.log("Message sent: %s", info.messageId);
    
    }
    catch (error) {
        console.log("Error occurred while sending mail ",error);
    }

}