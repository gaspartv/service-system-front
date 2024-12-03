'use client';

import {signIn} from "@/requests/sign-in";
import {getProfile} from "@/requests/profile";
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useRouter } from 'next/navigation'
import TextField from '@mui/material/TextField';
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface InitialValuesInterface {
    username: string;
    password: string;
}

export default function SignIn() {
    const router = useRouter();

    const localStorageSavePassword = "save-password"

    const [showPassword, setShowPassword] = useState(false);
    const [credentials, setCredentials] = useState<string | null>(null);
    const [checkbox, setCheckbox] = useState(false);

    useEffect(() => {
        const credentials = localStorage.getItem(localStorageSavePassword);
        if (credentials) {
            setCredentials(credentials ?? "false");
        }
        setCheckbox(!!credentials);
    }, []);

    const validationSchema = Yup.object({
        username: Yup.string().required('O nome de usuário é obrigatório'),
        password: Yup.string().required('A senha é obrigatória'),
    });

    async function handleSubmit(values: InitialValuesInterface) {
        if (credentials !== "false") {
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
    }

    async function handleCheckboxChange(checked: boolean, values: InitialValuesInterface) {
        setCredentials(checked ? JSON.stringify(values) : "false");
        setCheckbox(checked);
        if (!checked) return localStorage.removeItem(localStorageSavePassword);
        credentials === "false" && localStorage.setItem(localStorageSavePassword, JSON.stringify(values));
    }

    return (
      <>
          {credentials && <div className="min-h-screen bg-cover bg-center flex justify-center items-center">
              <div className="flex flex-col gap-4 bg-zinc-900 bg-opacity-60 p-8 rounded-lg shadow-lg w-96">
                  <h1 className="text-3xl font-bold text-white">Entrar</h1>
                  <Formik
                    initialValues={credentials !== "false" ? JSON.parse(credentials) : {
                        username: '',
                        password: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                      {({ values, handleChange, handleBlur, touched, errors, setFieldTouched, setFieldError }) => (
                        <Form className="flex flex-col gap-4">
                            <div style={{ marginBottom: "16px" }}>
                                <Field
                                  as={TextField}
                                  id="username"
                                  name="username"
                                  label="E-mail ou número de celular"
                                  variant="outlined"
                                  fullWidth
                                  value={values.username}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  onFocus={() => {
                                      setFieldTouched('username', false).then(r => r);
                                      setFieldError('username', '');
                                  }}
                                  error={touched.username && Boolean(errors.username)}
                                  sx={{
                                      '& .MuiOutlinedInput-root': {
                                          '& fieldset': {
                                              borderColor: 'white',
                                          },
                                          '&:hover fieldset': {
                                              borderColor: 'white',
                                          },
                                          '&.Mui-focused fieldset': {
                                              borderColor: 'white',
                                          },
                                      },
                                      '& .MuiInputLabel-root': {
                                          color: 'white',
                                          '&.Mui-focused': {
                                              color: 'white',
                                          },
                                      },
                                      '& .MuiInputBase-root': {
                                          color: 'white',
                                      },
                                  }}
                                />
                                <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <FormControl
                                  variant="outlined"
                                  fullWidth
                                  sx={{
                                      '& .MuiOutlinedInput-root': {
                                          '& fieldset': {
                                              borderColor: 'white',
                                          },
                                          '&:hover fieldset': {
                                              borderColor: 'white',
                                          },
                                          '&.Mui-focused fieldset': {
                                              borderColor: 'white',
                                          },
                                      },
                                      '& .MuiInputLabel-root': {
                                          color: 'white',
                                          '&.Mui-focused': {
                                              color: 'white',
                                          },
                                          ...(touched.password && errors.password && {
                                              color: '#ef4444',
                                          }),
                                      },
                                      '& .MuiInputBase-root': {
                                          color: 'white',
                                      },
                                  }}
                                >
                                    <InputLabel htmlFor="outlined-adornment-password">
                                        Senha
                                    </InputLabel>
                                    <OutlinedInput
                                      id="outlined-adornment-password"
                                      name="password"
                                      type={showPassword ? 'text' : 'password'}
                                      value={values.password}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      onFocus={() => {
                                          setFieldTouched('password', false).then(r => r);
                                          setFieldError('password', '');
                                      }}
                                      error={touched.password && Boolean(errors.password)}
                                      endAdornment={
                                          <InputAdornment position="end">
                                              <IconButton
                                                aria-label={showPassword ? 'hide the password' : 'display the password'}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setShowPassword((show) => !show);
                                                }}
                                                edge="end"
                                              >
                                              <span
                                                className={touched.password && Boolean(errors.password) ? "text-red-700" : "text-zinc-300"}>
                                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                              </span>
                                              </IconButton>
                                          </InputAdornment>
                                      }
                                      label="Senha"
                                    />
                                </FormControl>
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className="flex flex-col gap-4">
                                <button
                                  type="submit"
                                  className="w-full py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    Entrar
                                </button>
                            </div>

                            <div className="text-center">
                                <a href="#" className="text-sm text-gray-300 hover:text-white">Esqueceu a senha?</a>
                            </div>

                            <div className="flex flex-col gap-4 ">
                          <span>
                              <FormControlLabel
                                onChange={(e: any) => {
                                    const checked = e.target.checked;
                                    handleCheckboxChange(checked, values).then(r => r);
                                }}
                                control={<Checkbox
                                  checked={checkbox}
                                  sx={{
                                      color: '#d1d5db',
                                      '&.Mui-checked': {
                                          color: '#d1d5db',
                                      },
                                  }} />} label="Lembre-se de mim"
                              />
                          </span>
                                <p>Novo por aqui? <a>Cadastre-se agora</a></p>
                                <p className="text-xs">Esta página é protegida pelo Google reCAPTCHA para garantir que
                                    você
                                    não é um
                                    robô. <span className="text-blue-500">Saiba mais.</span></p>
                            </div>
                        </Form>
                      )}
                  </Formik>
              </div>
          </div>}
      </>

    );
}
