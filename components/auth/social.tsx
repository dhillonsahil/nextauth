"use client"

import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { Button } from "../ui/button"
import { signIn } from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

export const Social = ()=>{
    const onClick=(provider:"google"| "github")=>{
        signIn(provider,{
            callbackUrl:DEFAULT_LOGIN_REDIRECT
        })
    }
    return (
        <div className="flex items-center w-full gap-x-2">
            <Button onClick={()=>{
                onClick("google")
            }} size={"lg"} className="w-full" variant={"outline"}>
                <FcGoogle />
            </Button>
            <Button onClick={()=>{
                onClick("github")
            }} size={"lg"} className="w-full" variant={"outline"}>
                <FaGithub />
            </Button>
        </div>
    )
}