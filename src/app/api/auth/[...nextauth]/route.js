import getAccessToken from "@/helpers/getAccessToken";
import { quizCraftBackend } from "@/helpers/getAxiosInstances";
import getRandomString from "@/helpers/getRandomString";
import cookie from "cookie";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
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
              "/api/user/verify-email",
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

            const user = data?.data;

            return user; // return the user's data
          } catch (err) {
            throw new Error(err.message);
          }
        } else {
          try {
            const { data } = await quizCraftBackend.post("/api/user/login", {
              email: credentials?.email,
              password: credentials?.password,
              provider: "email",
            });

            if (data?.status === false) {
              throw new Error(data?.message);
            } else {
              const user = data?.data;
              return user; // return the user's data
            }
          } catch (err) {
            throw new Error(err.message);
          }
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 12, // Expire in 12 Hours
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "credentials") {
        if (user) {
          return {
            ...token,
            ...user,
          };
        }
      }

      if (account?.provider === "google") {
        const values = {
          name: user?.name,
          email: user?.email,
          password: getRandomString(10),
          image: user?.image,
          provider: account?.provider,
        };
        const { data } = await quizCraftBackend.post(
          "/api/user/register",
          values,
        );
        const userData = data?.data;

        if (userData) {
          return {
            ...token,
            ...userData,
          };
        }
      }

      if (account?.provider === "github") {
        const values = {
          name: user?.name,
          email: user?.email,
          password: getRandomString(10),
          image: user?.image,
          provider: account?.provider,
        };
        const { data } = await quizCraftBackend.post(
          "/api/user/register",
          values,
        );
        const userData = data?.data;

        if (userData) {
          return {
            ...token,
            ...userData,
          };
        }
      }

      if (new Date().getTime() < token?.expiresIn) return token;

      return await getAccessToken(token);
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  // debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
