import NextAuth, { DefaultSession } from "next-auth"
import authConfig from "./auth.config"
import {PrismaAdapter} from'@auth/prisma-adapter';
import {db} from '@/lib/db'
import { getUserById } from "./data/user";
import { UserRole } from "@prisma/client";

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks:{
    async session({token,session}){
      console.log(token)
      if(token.sub && session.user){
        session.user.id=token.sub;
       
      }
      if(token.role && session.user){
        session.user.role=token.role;
      }
      return session;
    },async jwt({token}){
      if(!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if(!existingUser)  return token;
console.log(existingUser)
      token.role=existingUser.role;
      return token;
    },
    // Causing issue because auth providers you can't sign in
    // async signIn({user,account}){
    //   console.log(user,account)
    //   if(account?.provider!=="credentials") return true;
    //   const existingUser = await getUserById(user.id);
    //   if(!existingUser || !existingUser.emailVerified) return false;
    //   if(!existingUser ) return false;
    //   return true;
    // }
  },
  adapter:PrismaAdapter(db),
  session:{strategy:"jwt"},
  ...authConfig,
})