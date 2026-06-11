/**
 *An array of routes that are accesible to the public. These routes do not require authentication to access.
 *@type{string[]}
 */

 export const publicRoutes: string[] = [

 ]

 /**
  * AN array of routes that are protected. These routes require authentication to access.
  * @type{string[]} 
  */

 export const protectedRoutes: string[] = [

]

/**
 * An array of routes that are accessible to the public. Routes that start with the (/api/auth) prefix do not require authentication to access.
 * @type{string[]}
 */

export const authRoutes: string[] = [
    "/api/sign-in",
]

/**
 * An array of routes that are accessible to the public. Routes that start with the (/api/auth) prefix do not require authentication to access.
 * @type{string}  
 */

export const apiauthPrefix: string = "/api/auth"

export const DEFAULT_LOGIN_REDIRECT = "/";