// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser, Profile } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Profile {
    roles?: string[];
  }

  interface Session {
    accessToken?: string;
    error?: string;
    user: {
      role?: string;
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    accessToken?: string;
    accessTokenExpires?: number;
    refreshToken?: string;
    error?: string;
  }
}
