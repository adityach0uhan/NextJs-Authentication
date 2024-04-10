import createDatabaseConnection from '@/dbConfig/db';
import userModel from '@/model/userModel'
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

createDatabaseConnection();

export async function POST(request) {

    try {
        const Requestbody = await request.json();
        const { email, password } =await Requestbody;
        const user = await userModel.findOne(email);
        
        if (!user) {
            return NextResponse.json({
                message:`No user find with ${email}`
            })
        }

        return NextResponse.json({
            message: user,
        })





    } catch (error) {

        return NextResponse.json({
            message: "Something Went Wrong in Login Section",
            error: error,
            success: false
        })

    }


}