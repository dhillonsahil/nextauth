// import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"
import credentials from "next-auth/providers/credentials" 
import { LoginSchema } from "./schemas"
import { getUserbyEmail } from "./data/user";
import bcryptjs from "bcryptjs"
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export default { 
    providers: [
        Github({
            clientId:process.env.GITHUB_CLIENT_ID,
            clientSecret:process.env.GITHUB_CLIENT_SECRET
        }),Google({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
        })
        ,credentials({
        async authorize(credentials) {
            const validatedFields = LoginSchema.safeParse(credentials);
            if(validatedFields.success){
                const {email,password}=validatedFields.data;
                const user = await getUserbyEmail(email);
                if(!user || !user.password)return null;
                const passwordsMatch =await bcryptjs.compare(password,user.password);
                if(passwordsMatch) return user;
            }
            return null;
        }
    })] 
} satisfies NextAuthConfig