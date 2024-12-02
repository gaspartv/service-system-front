interface SignInInterface {
    username: string;
    password: string;
}

export async function signIn({ username,password } : SignInInterface) {
    const response = await fetch("http://localhost:3000/auth/sign-in", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "content-type": "application/json" },
        credentials: 'include',
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }
}
