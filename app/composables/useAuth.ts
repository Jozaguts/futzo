import { FetchError } from 'ofetch';
import { useForm } from 'vee-validate';
import { boolean, object, string } from 'yup';
import { ref } from 'vue';
import type { AuthForm } from '~/models/User';
import { specialCharacters, phoneRegex } from '~/utils/constants';

export default function useAuth() {
  const { refreshIdentity, logout } = useSanctumAuth();
  const user = useSanctumUser();
  const isPhone = ref(false);
  const { handleSubmit, defineField, errors, meta, resetForm } = useForm({
    initialValues: {
      isSignUp: true,
    },
    validationSchema: toTypedSchema(
      object({
        isSignUp: boolean().nullable().default(true),
        remember: boolean().nullable(),
        name: string()
          .nullable()
          .when('isSignUp', {
            is: true,
            then: (schema) => schema.required('El nombre es obligatorio'),
            otherwise: (schema) => schema.nullable(),
          }),
        inputType: string().nullable(),
        password: string()
          .required('La contraseña es obligatoria')
          .min(8, 'La contraseña debe tener al menos 8 caracteres')
          .matches(specialCharacters, 'La contraseña debe contener al menos un carácter especial'),
        username: string()
          .required('El correo o número teléfono  es obligatorio')
          .test(
            'is-valid-username',
            'El campo debe ser un número de teléfono o un correo electrónico válido',
            (value, context) => {
              const isEmail = string().email().isValidSync(value);
              isPhone.value = phoneRegex.test(value);
              context.parent.inputType = isPhone.value ? 'phone' : isEmail ? 'email' : null;
              return isEmail || isPhone.value;
            }
          ),
      })
    ),
  });
  const [name] = reactive(defineField('name'));
  const [password] = reactive(defineField('password'));
  const [username] = reactive(defineField('username'));
  const [remember] = reactive(defineField('remember'));
  const [isSignUp] = reactive(defineField('isSignUp'));
  const showRegisterForm = ref(true);
  const isLoading = ref(false);
  const errorMessage = ref('');
  const areaCode = ref('+52');

  const refreshIdentitySafe = async () => {
    try {
      await refreshIdentity();
      return !!user.value;
    } catch (e: any) {
      if (e?.response?.status === 401) {
        await logout?.().catch(() => {});
        user.value = null as any;
        return false;
      }
      return false;
    }
  };

  async function signIn(form: Partial<AuthForm>) {
    errorMessage.value = '';
    isLoading.value = true;
    const { login } = useSanctumAuth();
    await login({ ...form })
      .then(async () => {
        await useLocationStore().reloadLocations();
      })
      .catch((error: FetchError) => {
        const { message } = useApiError(error);
        errorMessage.value = message;
      })
      .finally(() => (isLoading.value = false));
  }

  async function signUp(form: Partial<AuthForm>) {
    const client = useSanctumClient();
    const { fbp, fbc, fbclid, event_id, test_event_code } = capiContext();
    const consent = true; // o tu estado real
    return await client('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ ...form, fbp, fbc, fbclid, event_id, consent, test_event_code }),
    });
  }

  function signUpHandler(form: Partial<AuthForm>) {
    errorMessage.value = '';
    isLoading.value = true;
    signUp(form)
      .then(async () => {
        useToast().toast({
          type: 'info',
          msg: 'Verificación de Cuenta',
          description:
            'Por favor, revisa tu correo y sigue las instrucciones para completar la verificación de tu cuenta.',
        });
        const url = isPhone.value
          ? `/verificar?phone=${encodeURIComponent(`${areaCode.value}${username.value}`)}`
          : `/verificar?email=${username.value}`;
        await useRouter().push(url);
        showRegisterForm.value = false;
      })
      .catch((error: FetchError) => {
        let { message } = useApiError(error);
        if (message.startsWith('Error:')) {
          message = message.replace('Error:', '');
        }
        errorMessage.value = message;
      })
      .finally(() => {
        isLoading.value = false;
      });
  }

  const onSuccess = (values: AuthForm) => {
    let form = {
      [isPhone.value ? 'phone' : 'email']: `${isPhone.value ? areaCode.value : ''}${values.username}`,
      password: values.password,
    };
    if (values?.isSignUp) {
      form.name = values.name as string;
      signUpHandler(form);
    } else {
      (async () => await signIn(form))();
    }
  };
  const onInvalidSubmit = (values: any | AuthForm) => {
    console.log(values);
  };
  const submitHandler = handleSubmit(onSuccess, onInvalidSubmit);

  const showRegisterFormHandler = () => {
    errorMessage.value = '';
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
    remember,
    errors,
    meta,
    areaCode,
    isSignUp,
    submitHandler,
    resetForm,
    showRegisterFormHandler,
    refreshIdentitySafe,
  };
}
