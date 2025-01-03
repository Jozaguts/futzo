import {useForm} from "vee-validate";
import * as yup from "yup";
import {boolean} from "yup";

const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
const phoneRegex = /^\d{2} \d{3} \d{3} \d{4}$/;

const yupString = () => {
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

    const {defineField, handleSubmit, resetForm, validate, setValues, meta} =
        useForm({
            validationSchema: schema,
            initialValues,
        });
    const fieldProps = reactive({} as any);

    fields.forEach((field: MaybeRefOrGetter) => {
        const [fieldValue, fieldPropsValue] = defineField(
            field,
            vuetifyConfig as any,
        );
        fieldProps[field] = {fieldValue, fieldPropsValue};
    });

    return {
        handleSubmit,
        resetForm,
        fields: fieldProps,
        validate,
        setValues,
        meta,
    };
}

function getSchemaByName(name: string) {
    let schemaFields = {} as any;
    const {t} = useI18n();
    switch (name) {
        case "signup":
            schemaFields.isSignup = boolean().default(false);
            schemaFields.password = yupString()
                .required("La contraseña es obligatoria")
                .min(8, "La contraseña debe tener al menos 8 caracteres")
                .matches(
                    specialCharacters,
                    "La contraseña debe contener al menos un carácter especial",
                );
            schemaFields.username = yup
                .string()
                .required("El correo o número teléfono  es obligatorio")
                .test(
                    "is-valid-username",
                    "El campo debe ser un número de teléfono o un correo electrónico válido",
                    (value, context) => {
                        const isEmail = yupString().email().isValidSync(value)
                        const isPhone = phoneRegex.test(value)
                        console.log(context)
                        context.parent.inputType = isPhone ? "phone" : isEmail ? "email" : null;
                        return (
                            isEmail || isPhone
                        );
                    },
                );
            schemaFields.name = yupString().when("isSignup", {
                is: true,
                then: (schema) => schema.required(),
                otherwise: (schema) => schema.nullable(),
            });
            break;
        case "create-location":
            schemaFields.location = yup.object().nullable();
            schemaFields.city = yupString().nullable();
            schemaFields.address = yupString().nullable();
            break;
        case "create-calendar":
            schemaFields.start_date = yup.date().required(t("forms.required"));
            schemaFields.end_date = yup.date().required(t("forms.required"));
            schemaFields.game_time = yup.number().required(t("forms.required"));
            schemaFields.time_between_games = yup
                .number()
                .required(t("forms.required"));
            schemaFields.schedules_available = yup.array().of(
                yup.object().shape({
                    day: yup.string(),
                    hours: yup.array().of(
                        yup.object().shape({
                            to: yup.string(),
                            from: yup.string(),
                        }),
                    ),
                }),
            );
            schemaFields.venues = yup.array().of(
                yup.object().shape({
                    id: yup.number().required(t("forms.required")),
                    days: yup.object().shape({
                        monday: yup
                            .object()
                            .shape({
                                start: yup.string(),
                                end: yup.string(),
                            })
                            .nullable(),
                        tuesday: yup
                            .object()
                            .shape({
                                start: yup.string(),
                                end: yup.string(),
                            })
                            .nullable(),
                        wednesday: yup
                            .object()
                            .shape({
                                start: yup.string(),
                                end: yup.string(),
                            })
                            .nullable(),
                        thursday: yup
                            .object()
                            .shape({
                                start: yup.string(),
                                end: yup.string(),
                            })
                            .nullable(),
                        friday: yup
                            .object()
                            .shape({
                                start: yup.string(),
                                end: yup.string(),
                            })
                            .nullable(),
                        saturday: yup
                            .object()
                            .shape({
                                start: yup.string(),
                                end: yup.string(),
                            })
                            .nullable(),
                        sunday: yup
                            .object()
                            .shape({
                                start: yup.string(),
                                end: yup.string(),
                            })
                            .nullable(),
                    }),
                }),
            );
            break;
        case "create-tournament-basic-info":
            schemaFields.id = yup.number().nullable();
            schemaFields.name = yupString().required(t("forms.required"));
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
            schemaFields.football_type_id = yup
                .number()
                .required(t("forms.required"));
            schemaFields.start_date = yup.date().nullable();
            schemaFields.end_date = yup.date().nullable();
            break;
        case "edit-tournament-basic-info":
            schemaFields.id = yup.number().nullable();
            schemaFields.name = yupString().required(t("forms.required"));
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
            schemaFields.football_type_id = yup
                .number()
                .required(t("forms.required"));
            schemaFields.start_date = yup.date().nullable();
            schemaFields.end_date = yup.date().nullable();
            break;
        case "edit-tournament-details-info":
            schemaFields.location = yup.object().nullable();
            schemaFields.city = yupString().nullable();
            schemaFields.address = yupString().nullable();
            schemaFields.prize = yupString().nullable();
            schemaFields.winner = yupString().nullable();
            schemaFields.description = yupString().nullable();
            schemaFields.status = yupString().nullable();
            break;
        case "create-tournament-details-info":
            schemaFields.location = yup.object().nullable();
            schemaFields.city = yupString().nullable();
            schemaFields.address = yupString().nullable();
            schemaFields.prize = yupString().nullable();
            schemaFields.winner = yupString().nullable();
            schemaFields.description = yupString().nullable();
            schemaFields.status = yupString().nullable();
            break;
        case "create-league":
            schemaFields.id = yupString().nullable();
            schemaFields.name = yupString()
                .min(6, t("league_min"))
                .required(t("forms.required"));
            schemaFields.location = yupString().nullable();
            schemaFields.description = yupString().nullable();
            schemaFields.creation_date = yup.date().nullable();
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
            schemaFields.status = yupString().nullable();
            break;
        case "create-category":
            schemaFields.name = yupString().required(t("forms.required"));
            schemaFields.age_range = yupString()
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
            schemaFields.gender = yupString().required(t("forms.required"));
            break;
        case "create-team":
            schemaFields.name = yupString().required(t("forms.required"));
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
            schemaFields.description = yupString().nullable();
            schemaFields.email = yupString().email();
            schemaFields.tournament_id = yup.number().required(t("forms.required"));
            schemaFields.phone = yupString().matches(
                /^(\+52)?(\d{10})$/,
                "Número de teléfono no es válido",
            );
            break;
        case "create-coach":
            schemaFields.name = yupString().nullable();
            schemaFields.email = yup
                .string()
                .email("Correo electrónico no válido")
                .nullable();
            schemaFields.phone = yupString().matches(
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
            schemaFields.name = yupString().nullable();
            schemaFields.email = yup
                .string()
                .email("Correo electrónico no válido")
                .nullable();
            schemaFields.phone = yupString().matches(
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
            schemaFields.name = yupString().required(t("forms.required"));
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
            schemaFields.description = yupString().nullable();
            schemaFields.email = yupString().email();
            schemaFields.tournament_id = yup.number().required(t("forms.required"));
            schemaFields.phone = yupString().matches(
                /^(\+52)?(\d{10})$/,
                "Número de teléfono no es válido",
            );
            break;
        case "edit-coach":
            schemaFields.name = yupString().required(t("forms.required"));
            schemaFields.email = yup.string();
            schemaFields.phone = yupString().matches(
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
            schemaFields.name = yupString().required(t("forms.required"));
            schemaFields.email = yup.string();
            schemaFields.phone = yupString().matches(
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
            schemaFields.name = yupString().required(t("forms.required"));
            schemaFields.email = yup
                .string()
                .email("Correo electrónico no válido")
                .required(t("forms.required"));
            // schemaFields.city = yup.string().required(t("forms.required"));
            schemaFields.phone = yupString();
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
            schemaFields.name = yupString().required(t("forms.required"));
            schemaFields.last_name = yupString().required(t("forms.required"));
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
            schemaFields.nationality = yupString().required(t("forms.required"));
            schemaFields.team_id = yup.number().nullable();
            schemaFields.category_id = yup.number().nullable();
            break;
        case "edit-player-basic-info":
            schemaFields.name = yupString().required(t("forms.required"));
            schemaFields.last_name = yupString().required(t("forms.required"));
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
            schemaFields.nationality = yupString().required(t("forms.required"));
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
            schemaFields.phone = yupString().matches(
                /^(\+52)?(\d{10})$/,
                "Número de teléfono no es válido",
            );
            schemaFields.email = yupString().email().required(t("forms.required"));
            schemaFields.notes = yup.string().nullable();
            break;
        case "edit-player-contact-info":
            schemaFields.phone = yupString().matches(
                /^(\+52)?(\d{10})$/,
                "Número de teléfono no es válido",
            );
            schemaFields.email = yupString().email().required(t("forms.required"));
            schemaFields.notes = yup.string().nullable();
            break;
        default:
            schemaFields = yup.mixed();
    }
    return yup.object().shape(schemaFields);
}
