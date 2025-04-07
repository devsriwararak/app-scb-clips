import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers : [
        CredentialsProvider({
            name: "Credentials",
            credentials : {
                username : {label: "Username", type: "text"},
                password : {label: " Password", type : "password"}
            },
            async authorize(credentials){
                if(credentials?.username === "admin" && credentials?.password === "1234"){
                    return {id: "1", name : "admin naii", username:"admin"}
                }
                return null
            }
        })
    ],
    pages : {
        signIn : '/login'
    },
    session : {
        strategy : "jwt"
    },
    callbacks : {
        async jwt({token, user}) {
            if(user) token.user = user
            return token
        },
        async session({session, token}){
            if(token?.user) session.user = token.user as any
            return session
        }
    }
})

export {handler as GET, handler as POST}