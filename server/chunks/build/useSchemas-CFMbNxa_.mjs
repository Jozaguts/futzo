import { u as useForm } from './vee-validate-DglmwfQ_.mjs';
import * as yup from 'yup';
import { boolean } from 'yup';
import { reactive } from 'vue';
import { bZ as useI18n } from './server.mjs';

const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
const phoneRegex = /^\d{2} \d{3} \d{3} \d{4}$/;
const yupString = () => {
  return yup.string().test(
    "no-leading-space",
    "No se permite espacio en blanco al inicio",
    (value) => {
      return !(value && value.startsWith(" "));
    }
  );
};
function useSchemas(schemaNAme, initialValues = {}) {
  const vuetifyConfig = (state) => {
    return {
      props: {
        "error-messages": state.errors
      }
    };
  };
  const schema = getSchemaByName(schemaNAme);
  const fields = Object.keys(schema.fields);
  const {
    defineField,
    handleSubmit,
    resetForm,
    validate,
    setValues,
    meta,
    setFieldValue
  } = useForm({
    validationSchema: schema,
    initialValues
  });
  const fieldProps = reactive({});
  fields.forEach((field) => {
    const [fieldValue, fieldPropsValue] = defineField(
      field,
      vuetifyConfig
    );
    fieldProps[field] = { fieldValue, fieldPropsValue };
  });
  return {
    handleSubmit,
    resetForm,
    fields: fieldProps,
    validate,
    setValues,
    meta,
    setFieldValue
  };
}
function getSchemaByName(name) {
  let schemaFields = {};
  const { t } = useI18n();
  switch (name) {
    case "calendar-location-step":
      schemaFields.tournament_id = yup.number().required(t("forms.required"));
      schemaFields.fields = yup.array().of(
        yup.object().shape({
          field_id: yup.number().required("Necesitas marcar un campo"),
          field_name: yup.string().required("El nombre del campo es obligatorio"),
          location_id: yup.string().required("La ubicaci\xF3n es obligatoria"),
          location_name: yup.string().required("El nombre de la ubicaci\xF3n es obligatorio"),
          step: yup.number().required("El paso es obligatorio"),
          availability: yup.object().shape({
            isCompleted: yup.boolean().required("Necesitas marcar si esta completado"),
            monday: yup.object().shape({
              enabled: yup.boolean(),
              start: yup.object().shape({
                hours: yup.string(),
                minutes: yup.string()
              }),
              end: yup.object().shape({
                hours: yup.string(),
                minutes: yup.string()
              })
            }).nullable(),
            tuesday: yup.object().shape({
              enabled: yup.boolean(),
              start: yup.object().shape({
                hours: yup.string(),
                minutes: yup.string()
              }),
              end: yup.object().shape({
                hours: yup.string(),
                minutes: yup.string()
              })
            }).nullable(),
            wednesday: yup.object().shape({
              enabled: yup.boolean(),
              start: yup.object().shape({
                hours: yup.string(),
                minutes: yup.string()
              }),
              end: yup.object().shape({
                hours: yup.string(),
                minutes: yup.string()
              })
            }).nullable(),
            thursday: yup.object().shape({
              enabled: yup.boolean(),
              start: yup.object().shape({
                hours: yup.string(),
                minutes: yup.string()
              }),
              end: yup.object().shape({
                hours: yup.string(),
                minutes: yup.string()
              })
            }).nullable(),
            friday: yup.object().shape({
              enabled: yup.boolean(),
              start: yup.object().shape({
                hours: yup.string(),
                minutes: yup.string()
              }),
              end: yup.object().shape({
                hours: yup.string(),
                minutes: yup.string()
              })
            }).nullable(),
            saturday: yup.object().shape({
              enabled: yup.boolean(),
              start: yup.object().shape({
                hours: yup.string(),
                minutes: yup.string()
              }),
              end: yup.object().shape({
                hours: yup.string(),
                minutes: yup.string()
              })
            }).nullable(),
            sunday: yup.object().shape({
              enabled: yup.boolean(),
              start: yup.object().shape({
                hours: yup.string(),
                minutes: yup.string()
              }),
              end: yup.object().shape({
                hours: yup.string(),
                minutes: yup.string()
              })
            }).nullable()
          })
        })
      );
      break;
    case "calendar-elimination-step":
      schemaFields.elimination_round_trip = yup.boolean().required(t("forms.required")).default(true);
      schemaFields.eliminationPhases = yup.array().of(
        yup.object().shape({
          id: yup.number().required(t("forms.required")),
          name: yup.string().required(t("forms.required")),
          is_active: yup.boolean().required(t("forms.required")),
          is_completed: yup.boolean().required(t("forms.required"))
        })
      );
      break;
    case "calendar-regular-step":
      schemaFields.round_trip = yup.boolean().required(t("forms.required")).default(false);
      schemaFields.tiebreakers = yup.array().of(
        yup.object().shape({
          id: yup.number().required(t("forms.required")),
          rule: yup.string().required(t("forms.required")),
          priority: yup.number().required(t("forms.required")),
          is_active: yup.boolean().required(t("forms.required")),
          tournament_configuration_id: yup.number().required(t("forms.required"))
        })
      ).required();
      break;
    case "calendar-general-step":
      schemaFields.total_teams = yup.number().required(t("forms.required"));
      schemaFields.tournament_id = yup.number().required(t("forms.required"));
      schemaFields.tournament_format_id = yup.number().required(t("forms.required"));
      schemaFields.football_type_id = yup.number().required(t("forms.required"));
      schemaFields.start_date = yup.date().required(t("forms.required"));
      schemaFields.game_time = yup.number().transform((value) => isNaN(value) ? void 0 : value).nullable().integer().required(t("forms.zeroIsValid"));
      schemaFields.time_between_games = yup.number().required(t("forms.zeroIsValid")).transform((value) => isNaN(value) ? void 0 : value).nullable();
      schemaFields.locations = yup.array().of(
        yup.object().shape({
          id: yup.number().required(t("forms.required")),
          name: yup.string().required(t("forms.required"))
        }).required(t("forms.required"))
      ).min(1, t("forms.location_required"));
      break;
    case "signup":
      schemaFields.isSignup = boolean().default(false);
      schemaFields.password = yupString().required("La contrase\xF1a es obligatoria").min(8, "La contrase\xF1a debe tener al menos 8 caracteres").matches(
        specialCharacters,
        "La contrase\xF1a debe contener al menos un car\xE1cter especial"
      );
      schemaFields.username = yup.string().required("El correo o n\xFAmero tel\xE9fono  es obligatorio").test(
        "is-valid-username",
        "El campo debe ser un n\xFAmero de tel\xE9fono o un correo electr\xF3nico v\xE1lido",
        (value, context) => {
          const isEmail = yupString().email().isValidSync(value);
          const isPhone = phoneRegex.test(value);
          console.log(context);
          context.parent.inputType = isPhone ? "phone" : isEmail ? "email" : null;
          return isEmail || isPhone;
        }
      );
      schemaFields.name = yupString().when("isSignup", {
        is: true,
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.nullable()
      });
      break;
    case "create-location":
      schemaFields.name = yupString().nullable();
      schemaFields.city = yupString().nullable();
      schemaFields.address = yupString().nullable();
      schemaFields.tags = yupString().nullable();
      schemaFields.autocomplete_prediction = yupString().nullable();
      break;
    case "availability-locations":
      schemaFields.monday = yup.object().shape({
        start: yup.string(),
        end: yup.string()
      }).nullable();
      schemaFields.tuesday = yup.object().shape({
        start: yup.string(),
        end: yup.string()
      }).nullable();
      schemaFields.wednesday = yup.object().shape({
        start: yup.string(),
        end: yup.string()
      }).nullable();
      schemaFields.thursday = yup.object().shape({
        start: yup.string(),
        end: yup.string()
      }).nullable();
      schemaFields.friday = yup.object().shape({
        start: yup.string(),
        end: yup.string()
      }).nullable();
      schemaFields.saturday = yup.object().shape({
        start: yup.string(),
        end: yup.string()
      }).nullable();
      schemaFields.sunday = yup.object().shape({
        start: yup.string(),
        end: yup.string()
      }).nullable();
      break;
    case "create-calendar":
      schemaFields.start_date = yup.date().required(t("forms.required"));
      schemaFields.game_time = yup.number().required(t("forms.required"));
      schemaFields.time_between_games = yup.number().required(t("forms.required"));
      schemaFields.locations = yup.array().of(
        yup.object().shape({
          id: yup.number().required(t("forms.required")),
          name: yup.string().required(t("forms.required"))
        })
      );
      break;
    case "create-tournament-basic-info":
      schemaFields.id = yup.number().nullable();
      schemaFields.name = yupString().required(t("forms.required"));
      schemaFields.image = yup.mixed().nullable().test(
        "File is required",
        "Solo im\xE1genes .jgp, png, svg ",
        (value) => {
          var _a;
          if (!value) return true;
          return ((_a = value == null ? void 0 : value.type) == null ? void 0 : _a.includes("image/")) || typeof value === "string";
        }
      );
      schemaFields.category_id = yup.number().required(t("forms.required"));
      schemaFields.tournament_format_id = yup.number().required(t("forms.required"));
      schemaFields.football_type_id = yup.number().required(t("forms.required"));
      schemaFields.start_date = yup.date().nullable();
      schemaFields.end_date = yup.date().nullable();
      schemaFields.minMax = yup.array().required(t("forms.required")).default([8, 30]).test(
        "minMax",
        "El m\xEDnimo debe ser menor que el m\xE1ximo",
        function(value) {
          return value[0] < value[1];
        }
      );
      break;
    case "edit-tournament-basic-info":
      schemaFields.id = yup.number().nullable();
      schemaFields.name = yupString().required(t("forms.required"));
      schemaFields.image = yup.mixed().nullable().test(
        "File is required",
        "Solo im\xE1genes .jgp, png, svg ",
        (value) => {
          var _a;
          if (!value) return true;
          return ((_a = value == null ? void 0 : value.type) == null ? void 0 : _a.includes("image/")) || typeof value === "string";
        }
      );
      schemaFields.minMax = yup.array().required(t("forms.required")).default([8, 30]).test(
        "minMax",
        "El m\xEDnimo debe ser menor que el m\xE1ximo",
        function(value) {
          return value[0] < value[1];
        }
      );
      schemaFields.category_id = yup.number().required(t("forms.required"));
      schemaFields.tournament_format_id = yup.number().required(t("forms.required"));
      schemaFields.football_type_id = yup.number().required(t("forms.required"));
      schemaFields.start_date = yup.date().nullable();
      schemaFields.end_date = yup.date().nullable();
      break;
    case "edit-tournament-details-info":
      schemaFields.locationIds = yup.array().of(yup.number()).required(t("forms.required"));
      schemaFields.prize = yupString().nullable();
      schemaFields.winner = yupString().nullable();
      schemaFields.description = yupString().nullable();
      schemaFields.status = yupString().nullable();
      break;
    case "create-tournament-details-info":
      schemaFields.locationIds = yup.array().of(yup.number()).required(t("forms.required"));
      schemaFields.prize = yupString().nullable();
      schemaFields.winner = yupString().nullable();
      schemaFields.description = yupString().nullable();
      schemaFields.status = yupString().nullable();
      break;
    case "create-league":
      schemaFields.id = yupString().nullable();
      schemaFields.name = yupString().min(6, t("league_min")).required(t("forms.required"));
      schemaFields.location = yupString().nullable();
      schemaFields.description = yupString().nullable();
      schemaFields.creation_date = yup.date().nullable();
      schemaFields.logo = yup.mixed().test(
        "File is required",
        "Solo im\xE1genes .jgp, png, svg",
        (value) => {
          var _a;
          if (!value) return true;
          return ((_a = value == null ? void 0 : value.type) == null ? void 0 : _a.includes("image/")) || typeof value === "string";
        }
      );
      schemaFields.banner = yup.mixed().test(
        "File is required",
        "Solo im\xE1genes .jgp, png, svg",
        (value) => {
          var _a;
          if (!value) return true;
          return ((_a = value == null ? void 0 : value.type) == null ? void 0 : _a.includes("image/")) || typeof value === "string";
        }
      );
      schemaFields.status = yupString().nullable();
      break;
    case "create-category":
      schemaFields.name = yupString().required(t("forms.required"));
      schemaFields.age_range = yupString().matches(
        /^(\d{2}-\d{2}|\*)$/,
        "El formato debe ser 'NN-NN' donde N es un d\xEDgito, o '*' para edad libre."
      ).test(
        "es-rango-valido-o-libre",
        'El primer n\xFAmero debe ser menor que el segundo, o usar "*" para edad libre',
        (value) => {
          if (!value) return false;
          if (value === "*") return true;
          const [inicio, fin] = value.split("-").map(Number);
          return inicio < fin;
        }
      );
      schemaFields.gender = yupString().required(t("forms.required"));
      break;
    case "create-team":
      schemaFields.name = yupString().required(t("forms.required"));
      schemaFields.image = yup.mixed().nullable().test(
        "File is required",
        "Solo im\xE1genes .jgp, png, svg ",
        (value) => {
          var _a;
          if (!value) return true;
          return ((_a = value == null ? void 0 : value.type) == null ? void 0 : _a.includes("image/")) || typeof value === "string";
        }
      );
      schemaFields.category_id = yup.number().required(t("forms.required"));
      schemaFields.address = yup.object({});
      schemaFields.colors = yup.object({}).nullable();
      schemaFields.description = yupString().nullable();
      schemaFields.email = yupString().email().nullable();
      schemaFields.tournament_id = yup.number().required(t("forms.required"));
      schemaFields.phone = yupString().transform((value) => value === "" ? null : value).nullable().notRequired().matches(/^(\+52)?(\d{10})$/, "N\xFAmero de tel\xE9fono no es v\xE1lido");
      break;
    case "create-coach":
      schemaFields.name = yupString().nullable();
      schemaFields.email = yup.string().email("Correo electr\xF3nico no v\xE1lido").nullable();
      schemaFields.phone = yupString().matches(
        /^(\+52)?(\d{10})$/,
        "N\xFAmero de tel\xE9fono no es v\xE1lido"
      );
      schemaFields.image = yup.mixed().nullable().test(
        "File is required",
        "Solo im\xE1genes .jgp, png, svg ",
        (value) => {
          var _a;
          if (!value) return true;
          return ((_a = value == null ? void 0 : value.type) == null ? void 0 : _a.includes("image/")) || typeof value === "string";
        }
      );
      break;
    case "create-owner":
      schemaFields.name = yupString().nullable();
      schemaFields.email = yup.string().email("Correo electr\xF3nico no v\xE1lido").nullable();
      schemaFields.phone = yupString().matches(
        /^(\+52)?(\d{10})$/,
        "N\xFAmero de tel\xE9fono no es v\xE1lido"
      );
      schemaFields.image = yup.mixed().nullable().test(
        "File is required",
        "Solo im\xE1genes .jgp, png, svg ",
        (value) => {
          var _a;
          if (!value) return true;
          return ((_a = value == null ? void 0 : value.type) == null ? void 0 : _a.includes("image/")) || typeof value === "string";
        }
      );
      break;
    case "edit-team":
      schemaFields.name = yupString().required(t("forms.required"));
      schemaFields.image = yup.mixed().nullable().test(
        "File is required",
        "Solo im\xE1genes .jgp, png, svg ",
        (value) => {
          var _a;
          if (!value) return true;
          return ((_a = value == null ? void 0 : value.type) == null ? void 0 : _a.includes("image/")) || typeof value === "string";
        }
      );
      schemaFields.category_id = yup.number().required(t("forms.required"));
      schemaFields.address = yup.object({});
      schemaFields.colors = yup.object({}).required(t("forms.required"));
      schemaFields.description = yupString().nullable();
      schemaFields.email = yupString().email().nullable();
      schemaFields.tournament_id = yup.number().required(t("forms.required"));
      schemaFields.phone = yupString().transform((value) => value === "" ? null : value).nullable().notRequired().matches(/^(\+52)?(\d{10})$/, "N\xFAmero de tel\xE9fono no es v\xE1lido");
      break;
    case "edit-coach":
      schemaFields.name = yupString();
      schemaFields.email = yup.string().transform((value) => value === "" ? null : value).notRequired().nullable();
      schemaFields.phone = yupString().matches(
        /^(\+52)?(\d{10})$/,
        "N\xFAmero de tel\xE9fono no es v\xE1lido"
      );
      schemaFields.image = yup.mixed().nullable().test(
        "File is required",
        "Solo im\xE1genes .jgp, png, svg ",
        (value) => {
          var _a;
          if (!value) return true;
          return ((_a = value == null ? void 0 : value.type) == null ? void 0 : _a.includes("image/")) || typeof value === "string";
        }
      );
      break;
    case "edit-owner":
      schemaFields.name = yupString();
      schemaFields.email = yup.string();
      schemaFields.phone = yupString().matches(
        /^(\+52)?(\d{10})$/,
        "N\xFAmero de tel\xE9fono no es v\xE1lido"
      );
      schemaFields.image = yup.mixed().nullable().test(
        "File is required",
        "Solo im\xE1genes .jgp, png, svg ",
        (value) => {
          var _a;
          if (!value) return true;
          return ((_a = value == null ? void 0 : value.type) == null ? void 0 : _a.includes("image/")) || typeof value === "string";
        }
      );
      break;
    case "edit-user":
      schemaFields.name = yupString().required(t("forms.required"));
      schemaFields.email = yup.string().email("Correo electr\xF3nico no v\xE1lido").required(t("forms.required"));
      schemaFields.phone = yupString();
      break;
    case "edit-password":
      schemaFields.password = yup.string().required(t("forms.required"));
      schemaFields.new_password = yup.string().required(t("forms.required"));
      schemaFields.new_password_confirmation = yup.string().required(t("forms.required")).oneOf(
        [yup.ref("new_password"), null],
        "Las contrase\xF1as no coinciden"
      );
      break;
    case "create-player-basic-info":
      schemaFields.name = yupString().required(t("forms.required"));
      schemaFields.last_name = yupString().required(t("forms.required"));
      schemaFields.birthdate = yup.date().required(t("forms.required"));
      schemaFields.image = yup.mixed().nullable().test(
        "File is required",
        "Solo im\xE1genes .jgp, png, svg ",
        (value) => {
          var _a;
          if (!value) return true;
          return ((_a = value == null ? void 0 : value.type) == null ? void 0 : _a.includes("image/")) || typeof value === "string";
        }
      );
      schemaFields.nationality = yupString().required(t("forms.required"));
      schemaFields.team_id = yup.number().nullable();
      schemaFields.category_id = yup.number().nullable();
      break;
    case "edit-player-basic-info":
      schemaFields.name = yupString().required(t("forms.required"));
      schemaFields.last_name = yupString().required(t("forms.required"));
      schemaFields.birthdate = yup.date().required(t("forms.required"));
      schemaFields.image = yup.mixed().nullable().test(
        "File is required",
        "Solo im\xE1genes .jgp, png, svg ",
        (value) => {
          var _a;
          if (!value) return true;
          return ((_a = value == null ? void 0 : value.type) == null ? void 0 : _a.includes("image/")) || typeof value === "string";
        }
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
        "N\xFAmero de tel\xE9fono no es v\xE1lido"
      );
      schemaFields.email = yupString().email().required(t("forms.required"));
      schemaFields.notes = yup.string().nullable();
      break;
    case "edit-player-contact-info":
      schemaFields.phone = yupString().matches(
        /^(\+52)?(\d{10})$/,
        "N\xFAmero de tel\xE9fono no es v\xE1lido"
      );
      schemaFields.email = yupString().email().required(t("forms.required"));
      schemaFields.notes = yup.string().nullable();
      break;
    default:
      schemaFields = yup.mixed();
  }
  return yup.object().shape(schemaFields);
}

export { useSchemas as u };
//# sourceMappingURL=useSchemas-CFMbNxa_.mjs.map
