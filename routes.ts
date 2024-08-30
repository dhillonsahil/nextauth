
/**
 * An array of routes that are accessible to the public 
 * These routes do not require authentication
 * @type{string[]}

*/
export const publicRoutes = [
    '/',
]

/**
 * An array of routes that are used for authentication 
 * These routes will redirect logged in user to settings
 * @type{string[]}

*/

export const authRoutes =[
    '/auth/login',
    '/auth/register',
]


/**
 * The prefix for api authentication routes
 * routes that start with these prefix are used for api authentication
 * @type{string}
 */
export const apiAuthPrefix = '/api/auth'

/**
 * The default PATH AFTER   login redirect @type{string}
 *  */ 

export const DEFAULT_LOGIN_REDIRECT='/settings'