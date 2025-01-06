'use client';

import { useRouter } from "next/navigation";
import { MethodEnum } from "@/src/enums/method.enum";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const deleteCookies = ['accessToken', 'profile'];

    for await (const name of deleteCookies) {
      await fetch('/api/cookie/delete', {
        method: MethodEnum.POST,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
        }),
      });
    }

    router.push('/auth/sign-in');
  }

  return (
    <button className={"flex justify-start items-end gap-1 p-4 rounded hover:bg-zinc-900 hover:font-bold hover:text-zinc-100"} onClick={handleSignOut}>
      <ExitToAppIcon fontSize="small" />
      Sair
    </button>
  );
}
