"use client";
import { CardWrapper } from "./card-wrapper"
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';
import {useForm} from "react-hook-form"
import {
    Form,FormControl,FormField,FormItem,FormLabel,FormMessage
} from '@/components/ui/form'
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../form-error";
import FormSucces from "../form-success";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";


export const LoginForm = ()=>{

    const [isPending,startTransition] = useTransition();
    const [error,setError]=useState<string | undefined>("");
    const [success,setSuccess]=useState<string | undefined>("");

    const form =useForm<z.infer<typeof LoginSchema>>({
        resolver:zodResolver(LoginSchema),
        defaultValues:{
            email:"",
            password:""
        }
    })

    const onSubmit:any = async(values:z.infer<typeof LoginSchema>)=>{
        setError("");
        setSuccess('')
        startTransition(async()=>{
            login(values).then((data) => {
                if(data!=undefined){
                    setError(data.error);
                }else{
                    setError("");
                }
                if(data!=undefined){
                    setSuccess(data.success);
                }else{
                    setSuccess("")
                }
                
            })
            
        })
    }

    return (
    <CardWrapper headerLabel="Welcome back" backButtonLabel="Don't have an account?" backButtonHref="/auth/register" showSocial>
       <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
            <FormField name="email" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input disabled={isPending} type='email' placeholder="example@ex.com" {...field} />
                            </FormControl>
                            <FormMessage  />
                        </FormItem>
                    )}
                        control={form.control}
                    />
                     <FormField name="password" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input disabled={isPending} type="password" placeholder="******" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                        control={form.control}
                    />
            </div>
            <FormError message={error} />
            <FormSucces message={success} />
            <Button disabled={isPending} type="submit" className="w-full">
                Login
            </Button>
        </form>
       </Form>
    </CardWrapper>
    )
}