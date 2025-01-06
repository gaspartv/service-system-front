import Link from "next/link";
import UndoIcon from "@mui/icons-material/Undo";
import MessageError from "@/app/error/components/message-error";

export default function PageError() {
  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col items-center justify-between pt-12 pb-6">
      <div className="flex flex-col gap-4 bg-zinc-900 bg-opacity-60 p-8 rounded-lg shadow-lg w-96">
        <p className="text-center text-4xl">⚠️</p>
        <MessageError />

        <Link
          className="flex justify-center mt-8 gap-3 w-full py-3 bg-zinc-600 text-white font-semibold rounded-md hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500"
          href="/"
        >
          <UndoIcon />
          Retornar para página inicial
        </Link>
      </div>
    </div>
  )
}
