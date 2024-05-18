import {FetchError} from "ofetch";
import {useGlobalStore} from "~/store";


export default function useAuth() {
    const {showSuccessNotification} = useGlobalStore()
    const showRegisterForm = ref(false);
    const form = ref({
        name: 'test',
        lastname: 'test',
        email: 'test@test.com',
        password: 'password',
        password_confirmation: 'password',
        remember: false,
    })
    const isLoading = ref(false)
    const errorMessage = ref('')
    async function signIn(email: string, password: string, remember: boolean) {
        const { login } = useSanctumAuth();
        return await login({ email, password, remember });
    }
    async function signUp(name: string, lastname: string, email: string, password: string, password_confirmation: string) {
        const client = useSanctumClient();
        return await client('/register',{
            method: 'POST',
            body: JSON.stringify({
                name,
                lastname,
                email,
                password,
                password_confirmation,
            }),
        })
    }
    function signUpHandler () {
        errorMessage.value =  ''
        isLoading.value = true
         signUp(form.value.name, form.value.lastname, form.value.email, form.value.password, form.value.password_confirmation)
            .then(() => {
                showSuccessNotification({
                    message: 'Por favor, revisa tu correo y sigue las instrucciones para verificar tu cuenta.'
                })
                showRegisterForm.value =  false
            })
            .catch((error: FetchError) => {
                let {message} = useApiError(error);
                console.log(message)
                if(message.startsWith('Error:')){
                    message = message.replace('Error:', '')
                }
                errorMessage.value = message
            })
            .finally(() => {
                isLoading.value = false
            })

    }
    function signInHandler () {
        errorMessage.value =  ''
        isLoading.value = true
        signIn(form.value.email, form.value.password, true)
            .then(() =>{

            })
            .catch((error: FetchError) =>{
                const {code, message} = useApiError(error);
                errorMessage.value = message
            })
            .finally(() => {
                isLoading.value = false
            })
        // todo si el mensaje de error es Su dirección de correo electrónico no está verificada monstrar un link para el reenvio del correo
        }
    const submitHandler = () => {
        if (!showRegisterForm.value) {
            // login
            signInHandler()
        } else {
            // registro
            signUpHandler()
        }
    }
    return {
        isLoading,
        form,
        errorMessage,
        showRegisterForm,
        submitHandler
    };
}