import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/github";
import { dbConnect } from "./db";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize() {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing Email or Password");
                }

                try {
                    await dbConnect();
                    const user = await User.findOne({
                        email: credentials.email,
                    });
                    if (!user) {
                        throw new Error("No user found with this email");
                    }
                    const isValid = await bcrypt.compare(
                        Credentials.password,
                        user.password
                    );
                    if (!isValid) {
                        throw new Error("Invalid Password");
                    }
                    return {
                        id: user._id.toString(),
                        email: user.email,
                    };
                } catch (error) {
                    console.log("Auth Error");

                    throw error;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
};
