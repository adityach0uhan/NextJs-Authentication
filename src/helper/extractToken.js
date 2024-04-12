import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export const getToken = (request) => {

    try {
        const token = request.cookies.get("token")?.value || "";
        const extractToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        return extractToken.id

    } catch (error) {

        throw new Error(error.message);
        
    }

}