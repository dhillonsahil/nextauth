# Setup Next auth

1. I created the register and login pages and send data to server components.
2. Setup prisma
3. i went to next auth website and copied prisma models and added fields like password
> run command npx prisma generate and npx prisma db push
4. created a auth.js file in root directory and pasted

<!--  Code copied from migrate to v5 page on authjs.dev -->
```javascript
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GitHub, Google],
})
```

5. Created a file  app/api/auth/[...nextauth]/route.ts
which contains code
```javascript
import { handlers } from "@/auth"
export const { GET, POST } = handlers
```


6. setup middle
```javascript
import { auth } from "@/auth"
 
export default auth((req) => {
  // req.auth
})
 
// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: [ '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
```