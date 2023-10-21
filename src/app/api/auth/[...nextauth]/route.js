import { quizCraftBackend } from "@/utils/api/getAxios";
import cookie from "cookie";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

async function refreshToken(token) {
  try {
    const { data } = await quizCraftBackend.post(
      "/api/user/refresh-token",
      {},
      {
        headers: {
          Authorization: `Refresh ${token.refreshToken}`,
        },
      },
    );

    console.log("Refreshed Fire!");

    if (data?.status) {
      return {
        ...token,
        accessToken: data?.data?.accessToken,
        refreshToken: data?.data?.refreshToken,
        expiresIn: data?.data?.expiresIn,
      };
    }
  } catch (error) {
    console.log("Something went wrong on refreshToken!");
  }
}

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

            const { name, email, image, role } = data?.data?.user;

            const user = {
              name,
              email,
              image,
              role,
            };

            return user; // return the user's data
          } catch (err) {
            throw new Error(err.message);
          }
        } else {
          try {
            const { data } = await quizCraftBackend.post("/api/user/login", {
              email: credentials?.email,
              password: credentials?.password,
            });

            if (data?.status === false) {
              throw new Error("Your credentials are incorrect!");
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
    maxAge: 60 * 60 * 24, // Expire in 1 Day
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          ...user,
        };
      }

      if (new Date().getTime() < token?.expiresIn) return token;

      return await refreshToken(token);
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
