'use client';

import {signIn} from "@/requests/sign-in";
import {getProfile} from "@/requests/profile";
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface InitialValuesInterface {
    username: string;
    password: string;
}

const validationSchema = Yup.object({
    username: Yup.string().required('O nome de usuário é obrigatório'),
    password: Yup.string().required('A senha é obrigatória'),
});

const initialValues = {
    username: '',
    password: '',
};

export default function SignIn() {
    const  handleSubmit = async ({username,password}: InitialValuesInterface) => {
        try {
            await signIn({ username, password })
            await getProfile()
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message);
                return;
            }
            toast.error('Erro desconhecido');
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Usuário</label>
                            <Field
                                type="text"
                                id="username"
                                name="username"
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Digite seu usuário"
                            />
                            <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
                            <Field
                                type="password"
                                id="password"
                                name="password"
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Digite sua senha"
                            />
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Entrar
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}
