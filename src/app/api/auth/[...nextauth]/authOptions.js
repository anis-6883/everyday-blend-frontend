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
        const user = {
          id: "1",
          name: "Anisuzzaman",
          email: "admin@demo.com",
          password: "123456",
          image:
            "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
        };

        if (credentials?.signup === "true") {
          console.log("User Sign Up");
          return user;
        } else {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Please enter email and password!");
          }

          if (!user) {
            throw new Error("Your given credentials is not correct!");
          }

          if (user && credentials?.password !== user.password) {
            throw new Error("Your given credentials is not correct!");
          }
          return user;
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
      console.log("My Account, ", account);
      console.log("My User, ", user);
      if (user) {
        return {
          ...token,
          image: user.image,
          name: user.name,
        };
      }
      return token;
    },
    async session({ session, user, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          image: token.image,
          name: token.name,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  // debug: process.env.NODE_ENV === "development",
};

export default authOptions;
