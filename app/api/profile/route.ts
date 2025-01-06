import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const cookie = req.headers.get('cookie') || '';

    const cookieHeader = cookie
      .split('; ')
      .find((c) => c.startsWith('accessToken='));

    if (!cookieHeader) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const url = process.env.API_URL + "/users/profile";
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': cookieHeader,
        },
        credentials: 'include',
    });

    if (!response.ok) {
        const error = await response.json();
        return NextResponse.json(error, { status: response.status });
    }

    return response;
}
