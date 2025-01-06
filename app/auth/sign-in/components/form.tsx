'use client';

import InputUsername from "@/app/auth/sign-in/components/input-username";
import InputPassword from "@/app/auth/sign-in/components/input-password";
import Button from "@/src/components/button";
import Link from "next/link";
import InputCheckboxSave from "@/app/auth/sign-in/components/input-checkbox-save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MethodEnum } from "@/src/enums/method.enum";

interface InitialValuesInterface {
  username: string;
  password: string;
}

export default function FormSignIn() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [checkbox, setCheckbox] = useState(false);

  const savePassword = process.env.NEXT_PUBLIC_SAVE_PASSWORD || '';

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: Yup.object({
      username: Yup.string().required('O nome de usuário é obrigatório'),
      password: Yup.string().required('A senha é obrigatória'),
    }),
    onSubmit: async (values) => {
      if (checkbox) {
        await fetch('/api/cookie/set', {
          method: MethodEnum.POST,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            body: values,
            name: savePassword,
          }),
        })
      } else {
        await fetch('/api/cookie/delete', {
          method: MethodEnum.POST,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: savePassword,
          }),
        });
      }

      const responseSignIn = await fetch('/api/sign-in', {
        method: MethodEnum.POST,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!responseSignIn.ok) {
        const error = await responseSignIn.json();
        toast.error(error.message);
        return;
      }

      const responseProfile = await fetch('/api/profile', {
        method: MethodEnum.GET,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (!responseProfile.ok) {
        const error = await responseSignIn.json();
        toast.error(error.message);
        return;
      }

      const bodyProfile = await responseProfile.json();

      await fetch('/api/cookie/set', {
        method: MethodEnum.POST,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          body: bodyProfile,
          name: 'profile',
        }),
      })

      router.push('/dashboard')
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/cookie/get?name=${savePassword}`, {
          method: MethodEnum.GET,
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        if (data.username) {
          await formik.setFieldValue('username', data.username);
          await formik.setFieldValue('password', data.password);
          setCheckbox(true);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData().then(r => r);
  }, []);

  async function handleCheckboxChange(checked: boolean, values: InitialValuesInterface) {
    await formik.setFieldValue('username', values.username);
    await formik.setFieldValue('password', values.password);
    setCheckbox(checked);

    if (checked) {
      await fetch('/api/cookie/set', {
        method: MethodEnum.POST,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          body: values,
          name: savePassword,
        }),
      })
      return;
    }
    await fetch('/api/cookie/delete', {
      method: MethodEnum.POST,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: savePassword,
      }),
    });
  }

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <InputUsername formik={formik} />
      <InputPassword formik={formik} showPassword={showPassword} setShowPassword={setShowPassword} />
      <Button>Entrar</Button>
      <Link href="/users/forgot-password" className="text-center text-sm text-gray-300 hover:text-white">
        Esqueceu a senha?
      </Link>
      <InputCheckboxSave handleCheckboxChange={handleCheckboxChange} formik={formik} checkbox={checkbox} />
      <p className="cursor-default">
        Novo por aqui? <Link href="/users/register" className="text-sm text-gray-300 hover:text-white">Cadastre-se
        agora</Link>
      </p>
    </form>
  )
}
