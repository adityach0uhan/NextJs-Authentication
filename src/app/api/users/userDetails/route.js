import createDatabaseConnection from '@/dbConfig/db';
import userModel from '@/model/userModel'
import { getTokenData } from '@/helper/extractToken';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import sendEmail from '@/helper/mailer.helper'


await createDatabaseConnection();
export async function POST(request) {

    const userID=await getTokenData(request);
    const user=await userModel.findOne({ _id:userID });

    return NextResponse.json({
        message: "User  Found :"+user,
        success: false,
    })


}