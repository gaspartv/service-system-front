"use client"

import { useSearchParams } from "next/navigation";
import { Security } from "@/src/utils/security";

export default function MessageError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('message');
  const messageError = error ? Security.decrypt(error) : 'Erro desconhecido';

  return (
    <p className="text-center tracking-wider">{messageError}</p>
  );
}
