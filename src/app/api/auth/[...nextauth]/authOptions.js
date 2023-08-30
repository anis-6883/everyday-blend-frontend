import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
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
        username: { label: "Username", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = {
          id: "1",
          username: "J Smith",
          email: "admin@demo.com",
          password: "123456",
        };

        if (
          credentials?.email === user.email &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  events: {
    async signIn(message) {
      const res = await fetch("/api/web-auth/signin", {
        method: "POST",
        body: {
          email: message?.user?.email,
          password:
            message?.account?.provider !== "credentials"
              ? message?.user?.password
              : "403403",
          provider: message?.account?.provider,
        },
      });
      const data = await res.json();
      console.log(data);
    },
  },
};

export default authOptions;
