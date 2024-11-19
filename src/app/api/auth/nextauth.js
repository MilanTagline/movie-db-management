import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Credentials({
      authorize: async (credentials) => {
        if (
          credentials.username === "admin" &&
          credentials.password === "password"
        ) {
          return { id: 1, name: "Admin" };
        }
        throw new Error("Invalid credentials");
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
