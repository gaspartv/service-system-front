import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { body, name } = await req.json();

  const response = NextResponse.json({ message: 'Cookie set' });

  response.cookies.set(name, JSON.stringify(body),{
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'none',
  });

  return response;
}
