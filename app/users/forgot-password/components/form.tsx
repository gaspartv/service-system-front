'use client';

import InputForgotPassword from "@/app/users/forgot-password/components/input-forgot-password";
import Button from "@/src/components/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { MethodEnum } from "@/src/enums/method.enum";

export default function FormForgotPassword() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Informe um email válido.').required('O email é obrigatório'),
    }),
    onSubmit: async (values) => {
      try {
        const responseForgotPassword = await fetch('/api/forgot-password', {
          method: MethodEnum.POST,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        if (!responseForgotPassword.ok) {
          const error = await responseForgotPassword.json();
          toast.error(error.message);
          return;
        }

        router.push('/users/password-change-requested-successfully')
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message);
          return;
        }
        toast.error('Erro desconhecido');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <InputForgotPassword formik={formik} />
      <Button>Enviar por email</Button>
    </form>
  )
}
