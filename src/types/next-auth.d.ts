import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth"

declare module "next-auth/jwt" {
    interface JWT {
        email: string;
        userId: string;
        role: string;
        image: string;
        accessToken: string;
        refreshToken: string;
    }
}

declare module "next-auth" {
    interface Session {
        user: {
            userId?: string;
            role?: string;
            accessToken?: string;
        } & DefaultSession['user']
    }
}