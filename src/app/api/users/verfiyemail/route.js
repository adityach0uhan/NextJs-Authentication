import createDatabaseConnection from '@/dbConfig/db';
import userModel from '@/model/userModel'
import { NextRequest, NextResponse } from 'next/server';

await createDatabaseConnection();

export async function POST(request) {
    try {

        const requestBody = await request.json();
        const { token } = requestBody;

        const user = await userModel.findOne({
            verifyUserToken: token,
            verifyUserTokenExpiry: {
                $gt: Date.now()
            }
        })

        if (!user) {
            return NextResponse.json({
                message: "Invalid Token , Token May be expired",
                success: false,
            })
        }

        console.log(user);
        user.isVerified = true;
        user.verifyUserToken = undefined;
        user.verifyUserTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({
            message: "User Verified Successfully",
            success: true,
        })


    } catch (error) {

        return NextResponse.json({
            error: error.message,
            success: false,
            message: "Error occurred in verifyemail route"
        })

    }
}