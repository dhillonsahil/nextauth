"use client";
import { CardWrapper } from "./card-wrapper"
import { RegisterSchema } from "@/schemas";
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
import { register } from "@/actions/register";
import { useState, useTransition } from "react";


export const RegisterForm = ()=>{

    const [isPending,startTransition] = useTransition();
    const [error,setError]=useState<string | undefined>("");
    const [success,setSuccess]=useState<string | undefined>("");

    const form =useForm<z.infer<typeof RegisterSchema>>({
        resolver:zodResolver(RegisterSchema),
        defaultValues:{
            email:"",
            password:"",
            name:""
        }
    })

    const onSubmit:any = async(values:z.infer<typeof RegisterSchema>)=>{
        setError("");
        setSuccess('')
        startTransition(async()=>{
            register(values).then((data) => {
                setError(data.error || "");
                setSuccess(data.success || "");
            })
            
        })
    }

    return (
    <CardWrapper headerLabel="Create an account" backButtonLabel="Already have an account?" backButtonHref="/auth/login" showSocial>
       <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
            <FormField name="name" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input disabled={isPending} type='text' placeholder="Bill Gates" {...field} />
                            </FormControl>
                            <FormMessage  />
                        </FormItem>
                    )}
                        control={form.control}
                    />
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
                Register
            </Button>
        </form>
       </Form>
    </CardWrapper>
    )
}