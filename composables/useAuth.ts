

export default function useAuth() {
    const { login } = useSanctumAuth();

    async function signIn(email: string, password: string, remember: boolean) {
        return await login({ email, password, remember });
    }

    async function signUp(name: string, lastname: string, email: string, password: string, password_confirmation: string) {
        const client = useSanctumClient();
       return useAsyncData('register', () =>
            client('/register',{
                method: 'POST',
                body: JSON.stringify({
                    name,
                    lastname,
                    email,
                    password,
                    password_confirmation,
                }),
            })
                .catch((error) => {
                    return error
                })
        );
    }

    return {
        signIn,
        signUp,
    };
}