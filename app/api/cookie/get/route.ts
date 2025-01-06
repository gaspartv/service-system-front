import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const param = searchParams.get('name');
  const cookie = req.headers.get('cookie') || '';
  const credentials = cookie
    .split('; ')
    .find((c) => c.startsWith( param + '='))
    ?.split('=')[1];
  const data = credentials ? JSON.parse(decodeURIComponent(credentials)) : {};
  return NextResponse.json(data);
}
