import FormSignIn from "@/app/auth/sign-in/components/form";

export default function PageSignIn() {
    return (
      <div className="min-h-screen bg-cover bg-center flex flex-col items-center justify-between pt-12 pb-6">
          <div className="flex flex-col gap-4 bg-zinc-900 bg-opacity-60 p-8 rounded-lg shadow-lg w-96">
              <h1 className="text-3xl font-bold text-white cursor-default">Entrar</h1>
              <FormSignIn />
          </div>
      </div>
    );
}
