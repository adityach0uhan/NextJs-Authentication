import createDatabaseConnection from '@/dbConfig/db';
import userModel from '@/model/userModel'
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken"
createDatabaseConnection();

export async function POST(request) {

    try {
        const Requestbody = await request.json();
        const { email, password } = await Requestbody;
        const user = await userModel.findOne({ emailid: email });

        if (!user) {
            return NextResponse.json({
                message: `No User Found With this email :${email}  `,
            })
        }

        const isVerified = await bcryptjs.compare(password, user.password);

        if (!isVerified) {
            return NextResponse.json({
                message: "Check Your Credentials",
                status: 400,
            })
        }

        const tokenPayload = {
            id: user._id,
        }

        const jwtToken = await jwt.sign
            (
                tokenPayload,
                process.env.JWT_SECRET_KEY,
                {
                    expiresIn: '1d'
                }
            );


        const response =  NextResponse.json({
            message: "Login Successfull",
            success:true,
        })

        response.cookies.set("token", jwtToken, {
            httpOnly:true,
        })
 
        return response;



    } catch (error) {

        return NextResponse.json({
            message: "Something Went Wrong in Login Section",
            error: error.message,
            success: false
        })

    }


}