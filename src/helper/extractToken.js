import jwt from 'jsonwebtoken'

export const getTokenData =async (request) => {

    try {
        const token = await request.cookies.get("token")?.value || "";
        const extractToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        return extractToken.id;

    } catch (error) {

        throw new Error(error.message);
        
    }

}