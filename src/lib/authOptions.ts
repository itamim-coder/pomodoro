import { jwtHelpers } from "@/helpers/jwtHelpers";
import { getNewAccessToken } from "@/services/getNewAccessToken";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            id: "moynaa-backend",
            name: "Credentials",
            type: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "Your email.....",
                },
                password: { label: "Password", type: "password" },
                role: { type: "text" },
            },
            async authorize(credentials, req) {
                try {
                    const res = await fetch(`${process.env.BACKEND_URL}/auth/signin`, {
                        method: "POST",
                        body: JSON.stringify(credentials),
                        headers: { "Content-Type": "application/json" },
                    });
                    const { data } = await res.json();
                    const verifiedToken: any = jwtHelpers.verifyToken(
                        data?.accessToken,
                        process.env.JWT_SECRET!
                    );
                    // console.log(data, "auth option")
                    if (res.ok && data) {
                        return {
                            ...data,
                            ...verifiedToken,
                        };
                    }
                } catch (error: any) {
                    // console.log(error);
                    throw new Error(error.message);
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // console.log(token, "token auth option")
            // console.log(user, "user auth option")
            return {
                ...token,
                ...user,
            };
        },
        async session({ session, token }: { session: any; token: any }) {
            // console.log(session, "session auth option")
            // console.log(token, "token auth option inside session")
            const verifiedToken = jwtHelpers.verifyToken(
                token?.accessToken,
                process.env.JWT_SECRET!
            );
            if (!verifiedToken) {
                console.log("token expired so new token generated");
                const { data } = await getNewAccessToken(token?.accessToken);
                token.accessToken = data?.accessToken;
            }
            return {
                ...session,
                ...token,
            };
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
        error: "/",
        signOut: "/login",
    },
};