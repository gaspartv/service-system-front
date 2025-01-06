import Link from "next/link";
import FormForgotPassword from "@/app/users/forgot-password/components/form";

export default function PageForgotPassword() {
  return (
    <div className="h-[600px] flex justify-center items-center">
      <div className="fixed top-8 right-12">
        <Link
          href="/auth/sign-in"
          className="text-red-600 text-xl hover:text-red-500 hover:underline"
        >
          Entrar
        </Link>
      </div>
      <div className="flex flex-col gap-4 bg-zinc-200 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-zinc-800 cursor-default">
          Atualizar senha
        </h1>
        <p className="text-zinc-800 cursor-default">
          Enviaremos um email com instruções de como redefinir sua senha.
        </p>
        <FormForgotPassword />
      </div>
    </div>
  );
}
