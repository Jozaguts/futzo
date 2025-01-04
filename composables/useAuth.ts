import {FetchError} from "ofetch";
import {useForm} from "vee-validate";
import {boolean, object, string} from "yup";
import {ref} from "vue";
import type {AuthForm} from "~/models/user";

const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
const phoneRegex = /^\d{10}$/;
export default function useAuth() {
    const isPhone = ref(false)
    const {handleSubmit, defineField, errors, meta} = useForm({
        validationSchema: toTypedSchema(
            object({
                isSignUp: boolean().nullable().default(true),
                terms: boolean().required("Debes aceptar los términos y condiciones").default(false),
                remember: boolean().nullable(),
                name: string().nullable()
                    .when('isSignUp', {
                        is: true,
                        then: (schema) => schema.required('El nombre es obligatorio'),
                        otherwise: (schema) => schema.nullable(),
                    }),
                inputType: string().nullable(),
                password: string()
                    .required("La contraseña es obligatoria")
                    .min(8, "La contraseña debe tener al menos 8 caracteres")
                    .matches(
                        specialCharacters,
                        "La contraseña debe contener al menos un carácter especial",
                    ),
                username: string()
                    .required("El correo o número teléfono  es obligatorio")
                    .test(
                        "is-valid-username",
                        "El campo debe ser un número de teléfono o un correo electrónico válido",
                        (value, context) => {
                            const isEmail = string().email().isValidSync(value);
                            isPhone.value = phoneRegex.test(value);
                            context.parent.inputType = isPhone
                                ? "phone"
                                : isEmail
                                    ? "email"
                                    : null;
                            return isEmail || isPhone.value;
                        },
                    ),
            }),
        )
    });
    const [name] = reactive(defineField("name"))
    const [password] = reactive(defineField("password"))
    const [username] = reactive(defineField("username"))
    const [terms] = reactive(defineField("terms"))
    const [remember] = reactive(defineField("remember"))
    const [isSignUp] = reactive(defineField("isSignUp"))
    const showRegisterForm = ref(true);
    const isLoading = ref(false);
    const errorMessage = ref("");
    const showVerificationLink = ref(false);
    const areaCode = ref("+52");

    async function signIn(form: Partial<AuthForm>) {
        errorMessage.value = ''
        const {login} = useSanctumAuth();
        return await login({...form})
            .catch((error: FetchError) => {
                const {message, code} = useApiError(error);
                errorMessage.value = message;
            });
    }

    async function signUp(form: Partial<AuthForm>) {
        const client = useSanctumClient();
        return await client("/auth/register", {
            method: "POST",
            body: JSON.stringify(form),
        })
    }

    function signUpHandler(form: Partial<AuthForm>) {
        errorMessage.value = "";
        isLoading.value = true;
        signUp(form)
            .then(() => {
                useToast().toast(
                    "info",
                    "Verificación de Cuenta",
                    "Por favor, revisa tu correo y sigue las instrucciones para completar la verificación de tu cuenta.",
                );
                useRouter().push("/verificar?email=" + username.value);
                showRegisterForm.value = false;
            })
            .catch((error: FetchError) => {
                let {message} = useApiError(error);
                if (message.startsWith("Error:")) {
                    message = message.replace("Error:", "");
                }
                errorMessage.value = message;
            })
            .finally(() => {
                isLoading.value = false;
            });
    }

    function signInHandler({username, password}: { username: string, password: string }) {
        errorMessage.value = "";
        isLoading.value = true;
        signIn(username, password, true)
            .catch((error: FetchError) => {
                const {code, message} = useApiError(error);
                if (
                    message === "Su dirección de correo electrónico no está verificada."
                ) {
                    showVerificationLink.value = true;
                }
                errorMessage.value = message;
            })
            .finally(() => {
                isLoading.value = false;
            });
        // todo si el mensaje de error es Su dirección de correo electrónico no está verificada monstrar un link para el reenvio del correo
    }

    const onSuccess = (values: AuthForm) => {
        let form = {
            [isPhone.value ? 'phone' : 'email']: `${isPhone.value ? areaCode.value : ''}${values.username}`,
            password: values.password
        };
        if (values?.isSignUp) {
            form.name = values.name
            signUpHandler(form)
        } else {
            signIn(form)
        }
    }
    const onInvalidSubmit = (values: any | AuthForm) => {
        console.log(values)
    }
    const submitHandler = handleSubmit(onSuccess, onInvalidSubmit);

    const showRegisterFormHandler = () => {
        errorMessage.value = "";
        isSignUp.value = !isSignUp.value;
        showRegisterForm.value = !showRegisterForm.value;
    };
    return {
        isLoading,
        showRegisterForm,
        errorMessage,
        name,
        password,
        username,
        terms,
        remember,
        errors,
        meta,
        areaCode,
        showRegisterFormHandler,
        submitHandler,
    };
}
