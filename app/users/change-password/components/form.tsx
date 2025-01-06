"use client"

import InputNewPassword from "@/app/users/change-password/components/input-new-password";
import InputConfirmNewPassword from "@/app/users/change-password/components/input-confirm-new-password";
import Button from "@/src/components/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { MethodEnum } from "@/src/enums/method.enum";
import { Security } from "@/src/utils/security";

export default function FormChangePassword() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmNewPassword: ""
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().required('A senha é obrigatório'),
      confirmNewPassword: Yup.string().required('A confirmação é obrigatória'),
    }),
    onSubmit: async (values) => {
      const responseChangePassword = await fetch('/api/change-password', {
        method: MethodEnum.POST,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          password: Security.encrypt(values.newPassword),
        }),
      })
      if (!responseChangePassword.ok) {
        const error = await responseChangePassword.json();
        toast.error(error.message);
        return;
      }

      toast.success('Senha alterada com sucesso!');
      router.push('/auth/sign-in')
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <InputNewPassword formik={formik} />
      <InputConfirmNewPassword formik={formik} />
      <Button>Enviar</Button>
    </form>
  )
}
