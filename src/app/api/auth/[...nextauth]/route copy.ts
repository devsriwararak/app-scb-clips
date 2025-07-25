import NextAuth, { DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
           id: string
            name: string
            role: string
            username: string
        }
        accessToken?: string;
    }
    interface User extends DefaultUser {
        accessToken?: string;
        role: string
        username: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        accessToken?: string;
        role: string
        username: string

    }
}


import CredentialsProvider from "next-auth/providers/credentials";

type CredentialsType = {
    id: string;
    username: string;
    role: string;
    accessToken: string;
  }

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                // username: { label: "Username", type: "text" },
                // password: { label: " Password", type: "password" }
            },
            
            
            async authorize(credentials : unknown){
                const creds = credentials as CredentialsType;
                if (!creds) return null;

                return {
                    id: creds.id, 
                    username: creds.username,
                    role: creds.role,
                    accessToken: creds.accessToken,
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/signin'
    },
    session: {
        strategy: "jwt",
        maxAge:  60 * 50, // 5 นาที
        updateAge: 5 * 60, // (optional) ทุกๆ 5 นาทีจะต่ออายุ session ให้อัตโนมัติ
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken
                token.role = user.role
                token.username = user.username
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (token?.accessToken) {
                session.accessToken = token.accessToken
                session.user = {
                    ...session.user,
                    username: token.username,
                    role: token.role,
                    id : token.id
                }
            }
            return session
        }
    }
})

export { handler as GET, handler as POST }

