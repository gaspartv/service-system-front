'use client';

import { signIn } from "@/requests/sign-in";
import { getProfile } from "@/requests/profile";
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import InputUsername from "@/app/sign-in/components/input-username";
import InputPassword from "@/app/sign-in/components/input-password";
import Button from "@/src/components/button";
import InputCheckboxSave from "@/app/sign-in/components/input-checkbox-save";
import Link from "next/link";

interface InitialValuesInterface {
    username: string;
    password: string;
}

export default function SignIn() {
    const router = useRouter();

    const localStorageSavePassword = "save-password"

    const [showPassword, setShowPassword] = useState(false);
    const [checkbox, setCheckbox] = useState(false);

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
                localStorage.setItem(localStorageSavePassword, JSON.stringify(values));
            } else {
                localStorage.removeItem(localStorageSavePassword);
            }

            try {
                await signIn(values)
                await getProfile()
                router.push('/dashboard')
            } catch (err: unknown) {
                if (err instanceof Error) {
                    toast.error(err.message);
                    return;
                }
                toast.error('Erro desconhecido');
            }
        },
    });

    useEffect(() => {
        const credentials = localStorage.getItem(localStorageSavePassword);
        if (credentials) {
            const { username, password } = JSON.parse(credentials);
            formik.setFieldValue('username', username);
            formik.setFieldValue('password', password);
        }
        setCheckbox(!!credentials);
    }, []);

    async function handleCheckboxChange(checked: boolean, values: InitialValuesInterface) {
        await formik.setFieldValue('username', values.username);
        await formik.setFieldValue('password', values.password);
        setCheckbox(checked);
        if (!checked) return localStorage.removeItem(localStorageSavePassword);
        localStorage.setItem(localStorageSavePassword, JSON.stringify(values));
    }

    return (
      <div className="min-h-screen bg-cover bg-center flex justify-center items-center">
          <div className="flex flex-col gap-4 bg-zinc-900 bg-opacity-60 p-8 rounded-lg shadow-lg w-96">
              <h1 className="text-3xl font-bold text-white">Entrar</h1>
              <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                  <InputUsername formik={formik} />
                  <InputPassword formik={formik} showPassword={showPassword} setShowPassword={setShowPassword} />
                  <Button>Entrar</Button>
                  <Link href="/forgot-password" className="text-center text-sm text-gray-300 hover:text-white">Esqueceu a senha?</Link>
                  <InputCheckboxSave handleCheckboxChange={handleCheckboxChange} formik={formik} checkbox={checkbox} />
                  <p>Novo por aqui? <Link href="/register" className="text-sm text-gray-300 hover:text-white">Cadastre-se agora</Link></p>
              </form>
          </div>
      </div>
    );
}
