import createDatabaseConnection from '@/dbConfig/db';
import userModel from '@/model/userModel'
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

createDatabaseConnection();

export async function POST(request: NextRequest) {

  try {

    const requestBody = request.json
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
      UserData.save();
    


  } catch (error: any) {

    return NextResponse.json({ error: error.message })

  }

}


