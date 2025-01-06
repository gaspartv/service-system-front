import { ReactNode } from "react";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignOutButton from "@/app/dashboard/components/sign-out-button";

export default function RootLayout({
   children,
 }: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <html lang="pt_br">
        <body className="tracking-wider font-mono">
          <div className="flex items-center justify-center p-4 h-12 bg-zinc-800">
            <h1 className="text-2xl cursor-default">SISTEMA DE ATENDIMENTO</h1>
          </div>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </body>
      </html>
    </>
  );
}
