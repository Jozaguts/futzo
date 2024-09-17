import { useForm } from "vee-validate";
import * as yup from "yup";

export default function (schemaNAme: string) {
  const vuetifyConfig = (state: { errors: string }) => {
    return {
      props: {
        "error-messages": state.errors,
      },
    };
  };

  const schema = getSchemaByName(schemaNAme);

  const fields = Object.keys(schema.fields);

  const { defineField, handleSubmit, resetForm, validate, setValues } = useForm(
    {
      validationSchema: schema,
    },
  );
  const fieldProps = reactive({} as any);

  fields.forEach((field) => {
    const [fieldValue, fieldPropsValue] = defineField(field, vuetifyConfig);
    fieldProps[field] = { fieldValue, fieldPropsValue };
  });

  return {
    handleSubmit,
    resetForm,
    fields: fieldProps,
    validate,
    setValues,
  };
}

function getSchemaByName(name: string) {
  console.log(name);
  let schemaFields = {} as any;
  const { t } = useI18n();
  const yusString = () => {
    return yup
      .string()
      .test(
        "no-leading-space",
        "No se permite espacio en blanco al inicio",
        (value) => {
          return !(value && value.startsWith(" "));
        },
      );
  };
  switch (name) {
    case "create-tournament":
      schemaFields.name = yusString()
        .min(6, t("tournament_min"))
        .required(t("forms.required"));
      schemaFields.image = yup
        .mixed()
        .test("File is required", "Campo requerido ", (value: any) => value);
      schemaFields.category_id = yup.number().required(t("forms.required"));
      schemaFields.tournament_format_id = yup
        .number()
        .required(t("forms.required"));
      schemaFields.location = yup.object(); // club/lugar
      schemaFields.city = yusString().required(t("forms.required"));
      schemaFields.address = yusString().required(t("forms.required"));
      schemaFields.start_date = yup.date().nullable();
      schemaFields.end_date = yup.date().nullable();
      schemaFields.prize = yusString().required(t("forms.required"));
      schemaFields.winner = yusString().nullable();
      schemaFields.description = yusString().nullable();
      schemaFields.status = yusString().nullable();
      break;
    case "create-league":
      schemaFields.id = yusString().nullable();
      schemaFields.name = yusString()
        .min(6, t("league_min"))
        .required(t("forms.required"));
      schemaFields.location = yusString().nullable();
      schemaFields.description = yusString().nullable();
      schemaFields.creation_date = yup.date().nullable();
      schemaFields.football_type_id = yup
        .number()
        .required(t("forms.required"));
      schemaFields.logo = yup
        .mixed()
        .test("File is required", "File ", (value: File) => value);
      schemaFields.banner = yup
        .mixed()
        .test("File is required", "File ", (value: File) => value);
      schemaFields.status = yusString().nullable();
      break;
    case "create-category":
      schemaFields.name = yusString().required(t("forms.required"));
      schemaFields.age_range = yusString()
        .matches(
          /^(\d{2}-\d{2}|\*)$/,
          "El formato debe ser 'NN-NN' donde N es un dígito, o '*' para edad libre.",
        )
        .test(
          "es-rango-valido-o-libre",
          'El primer número debe ser menor que el segundo, o usar "*" para edad libre',
          (value) => {
            if (!value) return false;
            if (value === "*") return true;
            const [inicio, fin] = value.split("-").map(Number);
            return inicio < fin; // Retorna true si el primer número es menor que el segundo
          },
        );
      schemaFields.gender = yusString().required(t("forms.required"));
      break;
    case "create-team":
      schemaFields.name = yusString().required(t("forms.required"));
      schemaFields.image = yup
        .mixed()
        .test("File is required", "Campo requerido ", (value: any) => value);
      schemaFields.category_id = yup.number().required(t("forms.required"));
      schemaFields.address = yup.object({});
      schemaFields.colors = yup.object({}).required(t("forms.required"));
      schemaFields.description = yusString().nullable();
      schemaFields.email = yusString().email();
      schemaFields.tournament_id = yup.number().required(t("forms.required"));
      schemaFields.phone = yusString().matches(
        // acept format +52...
        /^(\+52)?(\d{10})$/,
        "Número de teléfono no es válido",
      );
      break;
    case "create-coach":
      schemaFields.name = yusString().required(t("forms.required"));
      schemaFields.email = yup
        .string()
        .email("Correo electrónico no válido")
        .required(t("forms.required"));
      schemaFields.phone = yusString().matches(
        // acept format +52...
        /^(\+52)?(\d{10})$/,
        "Número de teléfono no es válido",
      );
      schemaFields.avatar = yup
        .mixed()
        .test("File is required", "Campo requerido ", (value: any) => value);
      break;
    case "create-owner":
      schemaFields.name = yusString().required(t("forms.required"));
      schemaFields.email = yup
        .string()
        .email("Correo electrónico no válido")
        .required(t("forms.required"));
      schemaFields.phone = yusString().matches(
        // acept format +52...
        /^(\+52)?(\d{10})$/,
        "Número de teléfono no es válido",
      );
      schemaFields.avatar = yup
        .mixed()
        .test("File is required", "Campo requerido ", (value: any) => value);
      break;
    case "edit-team":
      schemaFields.name = yusString().required(t("forms.required"));
      schemaFields.image = yup.mixed().nullable();
      // .test("File is required", "Campo requerido ", (value: any) => value);
      schemaFields.category_id = yup.number().required(t("forms.required"));
      schemaFields.address = yup.object({});
      schemaFields.colors = yup.object({}).required(t("forms.required"));
      schemaFields.description = yusString().nullable();
      schemaFields.email = yusString().email();
      schemaFields.tournament_id = yup.number().required(t("forms.required"));
      schemaFields.phone = yusString().matches(
        // acept format +52...
        /^(\+52)?(\d{10})$/,
        "Número de teléfono no es válido",
      );
      break;
    case "edit-coach":
      schemaFields.name = yusString().required(t("forms.required"));
      schemaFields.email = yup.string();
      schemaFields.phone = yusString().matches(
        // acept format +52...
        /^(\+52)?(\d{10})$/,
        "Número de teléfono no es válido",
      );
      schemaFields.avatar = yup.mixed().nullable();
      // .test("File is required", "Campo requerido ", (value: any) => value);
      break;
    case "edit-owner":
      schemaFields.name = yusString().required(t("forms.required"));
      schemaFields.email = yup.string();
      schemaFields.phone = yusString().matches(
        // acept format +52...
        /^(\+52)?(\d{10})$/,
        "Número de teléfono no es válido",
      );
      schemaFields.avatar = yup.mixed().nullable();
    // .test("File is required", "Campo requerido ", (value: any) => value
    case "edit-user":
      schemaFields.name = yusString().required(t("forms.required"));
      schemaFields.email = yup
        .string()
        .email("Correo electrónico no válido")
        .required(t("forms.required"));
      // schemaFields.city = yup.string().required(t("forms.required"));
      schemaFields.phone = yusString();
      break;
    case "edit-password":
      schemaFields.password = yup.string().required(t("forms.required"));
      schemaFields.new_password = yup.string().required(t("forms.required"));
      schemaFields.new_password_confirmation = yup
        .string()
        .required(t("forms.required"))
        .oneOf([yup.ref("new_password"), null], "Las contraseñas no coinciden");
      break;
    case "create-player-basic-info":
      schemaFields.name = yusString().required(t("forms.required"));
      schemaFields.last_name = yusString().required(t("forms.required"));
      schemaFields.birthday = yup.date().required(t("forms.required"));
      schemaFields.avatar = yup
        .mixed()
        .test("File is required", "Campo requerido ", (value: any) => value);
      schemaFields.nationality = yusString().required(t("forms.required"));
      schemaFields.team_id = yup.number().nullable();
      schemaFields.category_id = yup.number().nullable();
      break;
    case "edit-player-basic-info":
      schemaFields.name = yusString().required(t("forms.required"));
      schemaFields.last_name = yusString().required(t("forms.required"));
      schemaFields.birthday = yup.date().required(t("forms.required"));
      schemaFields.avatar = yup
        .mixed()
        .test("File is required", "Campo requerido ", (value: any) => value);
      schemaFields.nationality = yusString().required(t("forms.required"));
      schemaFields.team_id = yup.number().nullable();
      schemaFields.category_id = yup.number().nullable();
      break;
    default:
      schemaFields = yup.mixed();
  }
  return yup.object().shape(schemaFields);
}
