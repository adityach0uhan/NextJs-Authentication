import createDatabaseConnection from '@/dbConfig/db';
import userModel from '@/model/userModel'
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

createDatabaseConnection();

export async function POST(request) {

    try {
        const Requestbody = await request.json();
        const { email, password } = await Requestbody;
        const user = await userModel.findOne({ emailid: email });
        
        if (!user) {
            return NextResponse.json({
                message:`No User Found With this email :${email}  `,
            })
        }

        const verified = await bcryptjs.compare(password,user.password);
        console.log(verified)
        
        return NextResponse.json({
            message: "User Found ",
        })




    } catch (error) {

        return NextResponse.json({
            message: "Something Went Wrong in Login Section",
            error: error.message,
            success: false
        })

    }


}