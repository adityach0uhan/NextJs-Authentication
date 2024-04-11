import createDatabaseConnection from '@/dbConfig/db';
import { NextRequest, NextResponse } from 'next/server';
createDatabaseConnection();

export async function GET(request) {
    try {
        

        const response = NextResponse.json({
            message: "Logout Successful",
            success:true,
        })
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        return response;


    } catch (error) {
        NextResponse.json({
            message: "Error Occurred in Logout Route",
            error:error,
        })
    }
}