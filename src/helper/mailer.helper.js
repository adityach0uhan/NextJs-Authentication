import nodemailer from 'nodemailer';
import userModel from '@/model/userModel';
import bcryptjs from 'bcryptjs'
export default async function sendEmail({ email, userID, emailType }){
    try {

        if (emailType === 'VERIFY') {

            // Get the current date and time
            const currentDate = new Date();
            // Add 6 hours to the current date and time
            const sixHoursFromNow = new Date(currentDate.getTime() + (6 * 60 * 60 * 1000));

            const hashedToken = bcryptjs.hash(userID, 10);

            userModel.findOneAndUpdate(userID, {
                verifyUserToken: hashedToken,
                verifyUserTokenExpiry: sixHoursFromNow,
            })

        } else if (emailType === 'RESET') {

            const currentDate = new Date();
            const sixHoursFromNow = new Date(currentDate.getTime() + (6 * 60 * 60 * 1000));
            const hashedToken = bcryptjs.hash(userID, 10);

            userModel.findOneAndUpdate(userID, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: sixHoursFromNow,
            })

        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USERID,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const info = await transporter.sendMail({
            from: "adityachauhan123@gmail.com",
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