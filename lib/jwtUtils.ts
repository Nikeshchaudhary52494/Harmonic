import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const generateToken = (userId: string, email: string): string => {
    return sign({ userId, email }, JWT_SECRET, {
        expiresIn: "1h",
    });
};

export const setAuthCookie = (token: string): void => {
    const cookieStore = cookies();
    cookieStore.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600,
        path: "/",
    });
};