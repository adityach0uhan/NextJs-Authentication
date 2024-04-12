import createDatabaseConnection from '@/dbConfig/db';
import userModel from '@/model/userModel'
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import sendEmail from '@/helper/mailer.helper'


await createDatabaseConnection();
export async function POST(request) {

  try {
    const requestBody = await request.json();
    const { username, password, email } =await requestBody;
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ error: "Email Already Exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);


    const UserData = await new userModel({
      username:username,
      password: hashedPassword,
      emailid: email,
    })
    const UserSignUpSuccessfull =await UserData.save();
    // console.log(UserSignUpSuccessfull);

    //Verification 
    await sendEmail({ email, userID:UserSignUpSuccessfull._id, emailType:"VERIFY" })
    return NextResponse.json({
      message: "Verification Email send successfully",
      success: true,
      UserSignUpSuccessfull,
    })

  } catch (error) {

    return NextResponse.json({
      message: "Error occurred in signup route page ",
      error: error.message
    })

  }

}


