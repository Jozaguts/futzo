import { useForm } from "vee-validate";
import * as yup from "yup";

export default function (schemaNAme: string, initialValues = {}) {
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
      initialValues,
    },
  );
  const fieldProps = reactive({} as any);

  fields.forEach((field: MaybeRefOrGetter) => {
    const [fieldValue, fieldPropsValue] = defineField(
      field,
      vuetifyConfig as any,
    );
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
    case "create-tournament-basic-info":
      schemaFields.id = yup.number().nullable();
      schemaFields.name = yusString().required(t("forms.required"));
      schemaFields.image = yup
        .mixed()
        .nullable()
        .test(
          "File is required",
          "Solo imágenes .jgp, png, svg ",
          (value: any) => {
            if (value === undefined) return true;
            return value?.type?.includes("image/") || typeof value === "string";
          },
        );
      schemaFields.category_id = yup.number().required(t("forms.required"));
      schemaFields.tournament_format_id = yup
        .number()
        .required(t("forms.required"));
      schemaFields.start_date = yup.date().nullable();
      schemaFields.end_date = yup.date().nullable();
      break;
    case "edit-tournament-basic-info":
      schemaFields.id = yup.number().nullable();
      schemaFields.name = yusString().required(t("forms.required"));
      schemaFields.image = yup
        .mixed()
        .nullable()
        .test(
          "File is required",
          "Solo imágenes .jgp, png, svg ",
          (value: any) => {
            if (value === undefined) return true;
            return value?.type?.includes("image/") || typeof value === "string";
          },
        );
      schemaFields.category_id = yup.number().required(t("forms.required"));
      schemaFields.tournament_format_id = yup
        .number()
        .required(t("forms.required"));
      schemaFields.start_date = yup.date().nullable();
      schemaFields.end_date = yup.date().nullable();
      break;
    case "edit-tournament-details-info":
      schemaFields.location = yup.object().nullable();
      schemaFields.city = yusString().nullable();
      schemaFields.address = yusString().nullable();
      schemaFields.prize = yusString().nullable();
      schemaFields.winner = yusString().nullable();
      schemaFields.description = yusString().nullable();
      schemaFields.status = yusString().nullable();
      break;
    case "create-tournament-details-info":
      schemaFields.location = yup.object().nullable();
      schemaFields.city = yusString().nullable();
      schemaFields.address = yusString().nullable();
      schemaFields.prize = yusString().nullable();
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
        .test(
          "File is required",
          "Solo imágenes .jgp, png, svg",
          (value: any) => {
            if (value === undefined) return true;
            return value?.type?.includes("image/") || typeof value === "string";
          },
        );
      schemaFields.banner = yup
        .mixed()
        .test(
          "File is required",
          "Solo imágenes .jgp, png, svg",
          (value: any) => {
            if (value === undefined) return true;
            return value?.type?.includes("image/") || typeof value === "string";
          },
        );
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
        .nullable()
        .test(
          "File is required",
          "Solo imágenes .jgp, png, svg ",
          (value: any) => {
            if (value === undefined) return true;
            return value?.type?.includes("image/") || typeof value === "string";
          },
        );
      schemaFields.category_id = yup.number().required(t("forms.required"));
      schemaFields.address = yup.object({});
      schemaFields.colors = yup.object({}).nullable();
      schemaFields.description = yusString().nullable();
      schemaFields.email = yusString().email();
      schemaFields.tournament_id = yup.number().required(t("forms.required"));
      schemaFields.phone = yusString().matches(
        /^(\+52)?(\d{10})$/,
        "Número de teléfono no es válido",
      );
      break;
    case "create-coach":
      schemaFields.name = yusString().nullable();
      schemaFields.email = yup
        .string()
        .email("Correo electrónico no válido")
        .nullable();
      schemaFields.phone = yusString().matches(
        /^(\+52)?(\d{10})$/,
        "Número de teléfono no es válido",
      );
      schemaFields.image = yup
        .mixed()
        .nullable()
        .test(
          "File is required",
          "Solo imágenes .jgp, png, svg ",
          (value: any) => {
            if (value === undefined) return true;
            return value?.type?.includes("image/") || typeof value === "string";
          },
        );
      break;
    case "create-owner":
      schemaFields.name = yusString().nullable();
      schemaFields.email = yup
        .string()
        .email("Correo electrónico no válido")
        .nullable();
      schemaFields.phone = yusString().matches(
        /^(\+52)?(\d{10})$/,
        "Número de teléfono no es válido",
      );
      schemaFields.image = yup
        .mixed()
        .nullable()
        .test(
          "File is required",
          "Solo imágenes .jgp, png, svg ",
          (value: any) => {
            if (value === undefined) return true;
            return value?.type?.includes("image/") || typeof value === "string";
          },
        );
      break;
    case "edit-team":
      schemaFields.name = yusString().required(t("forms.required"));
      schemaFields.image = yup
        .mixed()
        .nullable()
        .test(
          "File is required",
          "Solo imágenes .jgp, png, svg ",
          (value: any) => {
            if (value === undefined) return true;
            return value?.type?.includes("image/") || typeof value === "string";
          },
        );
      schemaFields.category_id = yup.number().required(t("forms.required"));
      schemaFields.address = yup.object({});
      schemaFields.colors = yup.object({}).required(t("forms.required"));
      schemaFields.description = yusString().nullable();
      schemaFields.email = yusString().email();
      schemaFields.tournament_id = yup.number().required(t("forms.required"));
      schemaFields.phone = yusString().matches(
        /^(\+52)?(\d{10})$/,
        "Número de teléfono no es válido",
      );
      break;
    case "edit-coach":
      schemaFields.name = yusString().required(t("forms.required"));
      schemaFields.email = yup.string();
      schemaFields.phone = yusString().matches(
        /^(\+52)?(\d{10})$/,
        "Número de teléfono no es válido",
      );
      schemaFields.image = yup
        .mixed()
        .nullable()
        .test(
          "File is required",
          "Solo imágenes .jgp, png, svg ",
          (value: any) => {
            if (value === undefined) return true;
            return value?.type?.includes("image/") || typeof value === "string";
          },
        );
      break;
    case "edit-owner":
      schemaFields.name = yusString().required(t("forms.required"));
      schemaFields.email = yup.string();
      schemaFields.phone = yusString().matches(
        /^(\+52)?(\d{10})$/,
        "Número de teléfono no es válido",
      );
      schemaFields.image = yup
        .mixed()
        .nullable()
        .test(
          "File is required",
          "Solo imágenes .jgp, png, svg ",
          (value: any) => {
            if (value === undefined) return true;
            return value?.type?.includes("image/") || typeof value === "string";
          },
        );
      break;
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
        .oneOf(
          [yup.ref("new_password"), null as any],
          "Las contraseñas no coinciden",
        );
      break;
    case "create-player-basic-info":
      schemaFields.name = yusString().required(t("forms.required"));
      schemaFields.last_name = yusString().required(t("forms.required"));
      schemaFields.birthdate = yup.date().required(t("forms.required"));
      schemaFields.image = yup
        .mixed()
        .nullable()
        .test(
          "File is required",
          "Solo imágenes .jgp, png, svg ",
          (value: any) => {
            if (value === undefined) return true;
            return value?.type?.includes("image/") || typeof value === "string";
          },
        );
      schemaFields.nationality = yusString().required(t("forms.required"));
      schemaFields.team_id = yup.number().nullable();
      schemaFields.category_id = yup.number().nullable();
      break;
    case "edit-player-basic-info":
      schemaFields.name = yusString().required(t("forms.required"));
      schemaFields.last_name = yusString().required(t("forms.required"));
      schemaFields.birthdate = yup.date().required(t("forms.required"));
      schemaFields.image = yup
        .mixed()
        .nullable()
        .test(
          "File is required",
          "Solo imágenes .jgp, png, svg ",
          (value: any) => {
            if (value === undefined) return true;
            return value?.type?.includes("image/") || typeof value === "string";
          },
        );
      schemaFields.nationality = yusString().required(t("forms.required"));
      schemaFields.team_id = yup.number().nullable();
      schemaFields.category_id = yup.number().nullable();
      break;
    case "create-player-details-info":
      schemaFields.position_id = yup.number().nullable();
      schemaFields.number = yup.number().nullable();
      schemaFields.height = yup.number().nullable();
      schemaFields.weight = yup.number().nullable();
      schemaFields.dominant_foot = yup.string().nullable();
      schemaFields.medical_notes = yup.string().nullable();
      break;
    case "edit-player-details-info":
      schemaFields.position_id = yup.number().nullable();
      schemaFields.number = yup.number().nullable();
      schemaFields.height = yup.number().nullable();
      schemaFields.weight = yup.number().nullable();
      schemaFields.dominant_foot = yup.string().nullable();
      schemaFields.medical_notes = yup.string().nullable();
      break;
    case "create-player-contact-info":
      schemaFields.phone = yusString().matches(
        /^(\+52)?(\d{10})$/,
        "Número de teléfono no es válido",
      );
      schemaFields.email = yusString().email().required(t("forms.required"));
      schemaFields.notes = yup.string().nullable();
      break;
    case "edit-player-contact-info":
      schemaFields.phone = yusString().matches(
        /^(\+52)?(\d{10})$/,
        "Número de teléfono no es válido",
      );
      schemaFields.email = yusString().email().required(t("forms.required"));
      schemaFields.notes = yup.string().nullable();
      break;
    default:
      schemaFields = yup.mixed();
  }
  return yup.object().shape(schemaFields);
}
