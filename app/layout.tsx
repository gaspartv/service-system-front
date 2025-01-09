import { ReactNode } from "react";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
   children,
 }: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <html lang="pt_br">
        <body className="tracking-wider font-mono min-w-[1060px]">
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
