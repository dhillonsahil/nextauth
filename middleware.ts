import authConfig from "./auth.config"
import NextAuth from "next-auth"
import {
  DEFAULT_LOGIN_REDIRECT,apiAuthPrefix,authRoutes,publicRoutes
} from'@/routes'

const { auth } = NextAuth(authConfig)



export default auth((req) => {
  const {nextUrl} = req;
  // req.auth
  const isLoggedIn = !!req.auth;
  
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  //  if api route do nothing
  if(isApiAuthRoute)return null;

  //  if user logged in redirect to settings
  if(isAuthRoute){
    if(isLoggedIn){
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))
    }
    return null;
  }

  // not logged in and not public route redirect to login
  if(!isLoggedIn && !isPublicRoute){
    return Response.redirect(new URL("/auth/login",nextUrl))
  }

  return null;
})
 
// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: [ '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}