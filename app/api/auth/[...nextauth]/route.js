import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

const credentials = CredentialsProvider?.default ?? CredentialsProvider;
const nextAuth = NextAuth?.default ?? NextAuth;

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) return null;

        await connectDB();
        const user = await User.findOne({ email }).lean();
        if (!user) return null;

        if (user.isActive === false) {
          throw new Error("Your account has been deactivated. Please contact your teacher.");
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) return null;

      return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role
      };
    }
  })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.uid = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.role) {
        session.user.role = token.role;
      }
      if (token?.uid) {
        session.user.id = token.uid;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login"
  }
};

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };
