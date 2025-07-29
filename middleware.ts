// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { jwtDecode } from 'jwt-decode';

// // Define the type for role protected paths
// type RoleProtectedPathKey = '/dashboard/manager' | '/dashboard/admin';

// // Paths that require authentication
// const PROTECTED_PATHS = [
//   '/dashboard',
//   '/bookings',
//   '/profile',
//   '/chat'
// ];

// // Paths that require specific roles
// const ROLE_PROTECTED_PATHS: Record<RoleProtectedPathKey, string[]> = {
//   '/dashboard/manager': ['manager', 'admin'],
//   '/dashboard/admin': ['admin']
// };

// // Paths that don't require the user to be authenticated
// const PUBLIC_PATHS = [
//   '/',
//   '/stations',
//   '/about',
//   '/pricing',
//   '/contact'
// ];

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
  
//   // Check if it's an API route
//   if (pathname.startsWith('/api/')) {
//     return NextResponse.next();
//   }
  
//   // Allow public assets
//   if (
//     pathname.startsWith('/_next') || 
//     pathname.startsWith('/favicon.ico') ||
//     pathname.includes('.')
//   ) {
//     return NextResponse.next();
//   }
  
//   // Get token from cookies
//   const token = request.cookies.get('token')?.value;
  
//   // Check if the path requires authentication
//   const isProtectedPath = PROTECTED_PATHS.some(path => pathname.startsWith(path));
//   const roleProtectedPath = Object.keys(ROLE_PROTECTED_PATHS).find(
//     path => pathname.startsWith(path)
//   ) as RoleProtectedPathKey | undefined;
  
//   // Public path, allow access
//   if (PUBLIC_PATHS.some(path => pathname === path) && !isProtectedPath && !roleProtectedPath) {
//     return NextResponse.next();
//   }
  
//   // No token for protected path, redirect to login
//   if ((isProtectedPath || roleProtectedPath) && !token) {
//     const url = new URL('/login', request.url);
//     url.searchParams.set('callbackUrl', pathname);
//     return NextResponse.redirect(url);
//   }
  
//   // Check for role-based access
//   if (roleProtectedPath && token) {
//     try {
//       const decoded: any = jwtDecode(token);
//       const allowedRoles = ROLE_PROTECTED_PATHS[roleProtectedPath];
      
//       if (!decoded.role || !allowedRoles.includes(decoded.role)) {
//         return NextResponse.redirect(new URL('/unauthorized', request.url));
//       }
//     } catch {
//       // Invalid token
//       const url = new URL('/login', request.url);
//       url.searchParams.set('callbackUrl', pathname);
//       return NextResponse.redirect(url);
//     }
//   }
  
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
// };

// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Allow all requests to pass through
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
};