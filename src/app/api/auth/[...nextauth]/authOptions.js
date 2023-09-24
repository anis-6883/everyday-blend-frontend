import { quizCraftBackend } from "@/utils/api/getAxios";
import cookie from "cookie";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  pages: {
    signIn: "/user/signin",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const cookies = cookie.parse(req.headers.cookie);
        // console.log("NextAuth Req Cookie->", cookies?._temp);

        if (credentials?.signup === "true") {
          try {
            const { data } = await quizCraftBackend.post(
              "/api/v1/user/verify-email",
              { otp: credentials?.otp },
              {
                headers: {
                  token: cookies?._temp,
                },
              },
            );

            if (data.status === false) {
              throw new Error("OTP is expired or incorrect!");
            }

            const { name, email, image, role } = data?.data?.user;

            const user = {
              name,
              email,
              image,
              role,
            };

            return user; // return the user's data
          } catch (err) {
            throw new Error("OTP is expired or incorrect!");
          }
        } else {
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // Expire in 1 Day
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("JWT User => ", user);

      if (user) {
        return {
          ...token,
          image: user?.image,
          name: user?.name,
          role: user?.role,
        };
      }
      return token;
    },
    async session({ session, user, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          image: token?.image,
          name: token?.name,
          role: token?.role,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  // debug: process.env.NODE_ENV === "development",
};

export default authOptions;
