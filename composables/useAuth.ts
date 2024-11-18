import { FetchError } from "ofetch";

export default function useAuth() {
  const showRegisterForm = ref(false);
  const form = ref({
    name: "test",
    email: "test@test.com",
    password: "password",
    password_confirmation: "password",
    remember: false,
  });
  const isLoading = ref(false);
  const errorMessage = ref("");
  const showVerificationLink = ref(false);

  async function signIn(email: string, password: string, remember: boolean) {
    const { login } = useSanctumAuth();
    return await login({ email, password, remember });
  }

  async function signUp(
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
  ) {
    const client = useSanctumClient();
    return await client("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
        password_confirmation,
      }),
    });
  }

  function signUpHandler() {
    errorMessage.value = "";
    isLoading.value = true;
    signUp(
      form.value.name,
      form.value.email,
      form.value.password,
      form.value.password_confirmation,
    )
      .then(() => {
        useToast().toast(
          "info",
          "Verificación de Cuenta",
          "Por favor, revisa tu correo y sigue las instrucciones para completar la verificación de tu cuenta.",
        );
        useRouter().push("/verify-email?email=" + form.value.email);
        showRegisterForm.value = false;
      })
      .catch((error: FetchError) => {
        let { message } = useApiError(error);
        if (message.startsWith("Error:")) {
          message = message.replace("Error:", "");
        }
        errorMessage.value = message;
      })
      .finally(() => {
        isLoading.value = false;
      });
  }

  function signInHandler() {
    errorMessage.value = "";
    isLoading.value = true;
    signIn(form.value.email, form.value.password, true)
      .catch((error: FetchError) => {
        const { code, message } = useApiError(error);

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

  const submitHandler = () => {
    if (!showRegisterForm.value) {
      // login
      signInHandler();
    } else {
      // registro
      signUpHandler();
    }
  };

  const showRegisterFormHandler = () => {
    errorMessage.value = "";
    showRegisterForm.value = !showRegisterForm.value;
  };
  return {
    isLoading,
    form,
    showRegisterForm,
    errorMessage,
    showRegisterFormHandler,
    submitHandler,
  };
}
