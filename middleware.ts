import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const profile = req.cookies.get('profile')?.value;

  console.log("Profile", profile);

  if (profile) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/sign-in', '/forgot-password', '/register'],
};
