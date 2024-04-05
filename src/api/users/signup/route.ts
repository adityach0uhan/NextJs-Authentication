import createDatabaseConnection from '@/dbConfig/db';
import userModel from '@/model/userModel'
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import sendEmail from '@/helper/mailer.helper'
createDatabaseConnection();

export async function POST(request: NextRequest) {

  try {

    const requestBody = await request.json();
    const { username, password, email } = requestBody;

    await userModel.findOne({ email })
    if (userModel) {
      return NextResponse.json({ error: "Already Exist" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const UserData = await new userModel({
      username,
      password: hashedPassword,
      emailid: email,
    })
    const UserSignUpSuccessfull = UserData.save();
    console.log(UserSignUpSuccessfull);

    //Verification 
    await sendEmail({ email, userID:UserSignUpSuccessfull._id, emailType:"VERIFY" })
    return NextResponse.json({
      message: "Verification Email send successfully",
      success: true,
      UserSignUpSuccessfull,
    })

  } catch (error: any) {

    return NextResponse.json({ error: error.message })

  }

}


