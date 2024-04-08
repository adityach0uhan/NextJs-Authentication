import nodemailer from 'nodemailer';
import userModel from '@/model/userModel';
import bcryptjs from 'bcryptjs'
import dotenv from 'dotenv';
dotenv.config();
export default async function sendEmail({ email, userID, emailType }) {
    try {
        if (emailType === 'VERIFY') {

            const hashedToken = await bcryptjs.hash(userID.toString(), 10);
            userModel.findByIdAndUpdate(userID, {
                verifyUserToken: hashedToken,
                verifyUserTokenExpiry: Date.now() + 3600000,
            })

        } else if (emailType === 'RESET') {
            const hashedToken = await bcryptjs.hash(userID.toString(), 10);
            console.log("Hashed Token :", hashedToken);
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

        console.log("All data regarding SMTP",
            "USerID :",process.env.SMTP_USERID,
            "user password :", process.env.SMTP_PASSWORD,
            "smtp port:", process.env.SMTP_PORT,
            "smtp host :", process.env.SMTP_HOST,
            "destination email", email
        )

        const verificationLink = 'http://localhost:3000';
        const info = await transporter.sendMail({
            from: "adityach0uhan@gmail.com",
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify Your Email ' : 'Reset Password',
            html: `<h4>
                   Dear User,
                  </h4>
            <p>
            Please click the following link to
             ${emailType === 'VERIFY' ? `Verify your Email ${email}` : 'reset your password'}:</p>
            <p>
            <a href="${verificationLink}">
            ${emailType === 'VERIFY' ? 'Verify Email' : 'Reset Password'}
            </a>
            </p>
            <p>If you did not request this ${emailType === 'VERIFY' ? 'verification' : 'password reset'}, you can ignore this email.</p>
            <p>Thank you!</p>`,
        });
        console.log("Message sent: %s", info.messageId);

    }
    catch (error) {
        console.log("Error occurred while sending mail ", error);
    }

}