import { MethodEnum } from "@/src/enums/method.enum";

export async function POST(req: Request) {
  const body = await req.json();
  const url = process.env.API_URL + "/users/change-password";

  return await fetch(url, {
    method: MethodEnum.POST,
    body: JSON.stringify(body),
    headers: { "content-type": "application/json" },
    credentials: 'include',
  });
}
