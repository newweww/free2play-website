import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/app/lib/connectDB";
import User from "@/app/models/user";
import bcryptjs from "bcryptjs";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {

            },
            async authorize(credentials, req) {

                const { email, password } = credentials;

                try {

                    await connectDB();
                    const user = await User.findOne({ email });

                    if (!user) {
                        return null
                    }

                    const passwordMatch = await bcryptjs.compare(password, user.password);

                    if (!passwordMatch) {
                        return null
                    }

                    return user;

                } catch (error) {
                    console.log(error)
                }

            }
        })
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: 'login',
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };