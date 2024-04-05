import createDatabaseConnection from '@/dbConfig/db';
import userModel from '@/model/userModel'
import { NextRequest, NextResponse } from 'next/server';

createDatabaseConnection();

export async function POST(request: NextRequest) {
  
    try {
      
      const requestBody = request.json
      const { username, password, email } = requestBody;
       
      await userModel.findOne({ email })
      if (userModel) {
        return NextResponse.json({ error: "Already Exist" });
      }


    } catch (error:any) {
      
      return NextResponse.json({error:error.message})

    }

}


