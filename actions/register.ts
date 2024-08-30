"use server";
import { RegisterSchema } from '@/schemas';
import * as z from 'zod'
import bcryptjs from 'bcryptjs';
import {db } from '@/lib/db'
import { getUserbyEmail } from '@/data/user';

export const register =async (values:z.infer<typeof RegisterSchema>)=>{
    const validatedFields = RegisterSchema.safeParse(values);
    if(!validatedFields.success){
        return {error:"Invalid fields"};

    }


    const {email,password,name}= validatedFields.data;
    const hashedPassword = await bcryptjs.hash(password,10);

    const exisitingUser =await getUserbyEmail(email);
    if(exisitingUser){
        return {error:"Email already in use"}  
    }

    await db.user.create({
       data:{
        name,email,password:hashedPassword
       }
    });

    // todo send verification token email
    return {success:"User Created"}
}