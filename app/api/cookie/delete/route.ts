import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name } = await req.json();

  const response = NextResponse.json({ message: 'Cookie delete' });

  console.log('sameSite: ', process.env.NODE_ENV === 'production' ? 'none' : 'strict')

  response.cookies.delete({
    name,
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  return response
}
