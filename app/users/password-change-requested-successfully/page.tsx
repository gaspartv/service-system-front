import DoneAllIcon from '@mui/icons-material/DoneAll';
import UndoIcon from '@mui/icons-material/Undo';
import Link from "next/link";

export default function PagePasswordChangeRequestedSuccessfully() {
  return (
    <div className="h-[600px] flex justify-center items-center">
      <div className="flex flex-col bg-zinc-200 p-8 rounded-lg shadow-lg w-[480px]">
        <div className="flex justify-center gap-2">
          <DoneAllIcon color="success" />
          <p className="text-black text-xl cursor-default">Solicitação de troca feita com sucesso!</p>
        </div>

        <p className="text-zinc-700 text-center mt-2 cursor-default">Confira seu email para continuar!</p>

        <Link
          className="flex justify-center mt-8 gap-3 w-full py-3 bg-zinc-600 text-white font-semibold rounded-md hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500"
          href="/auth/sign-in"
        >
          <UndoIcon />
          Retornar para página de login
        </Link>
      </div>
    </div>
  );
}
