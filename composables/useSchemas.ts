import {useForm} from 'vee-validate';
import * as yup from 'yup';
export default function (schemaNAme: string) {
    const vuetifyConfig = (state) => {
        return {
            props: {
                'error-messages': state.errors,
            },
        }
    };

    const schema = getSchemaByName(schemaNAme);
    const fields = Object.keys(schema.fields);

    const { defineField, handleSubmit, resetForm } = useForm({
        validationSchema: schema,
    });
    const fieldProps = reactive({});

    fields.forEach(field => {
        const [fieldValue, fieldPropsValue] = defineField(field, vuetifyConfig);
        fieldProps[field] = { fieldValue, fieldPropsValue };
    });

    return {
        handleSubmit,
        resetForm,
        fields: fieldProps,
    }
}

function getSchemaByName(name) {
    let schemaFields = {};
    const {t} = useI18n();
    switch (name) {
        // todo modifcar los campos de este esquema para que coincidan con los campos de la interfaz
        case 'create-tournament':
            schemaFields.name = yup.string().min(6, t('tournament_min')).required(t('forms.required'));
            schemaFields.start_date = yup.date().nullable();
            schemaFields.end_date = yup.date().nullable();
            schemaFields.prize =  yup.string().nullable();
            schemaFields.winner = yup.string().nullable();
            schemaFields.description = yup.string().nullable();
            schemaFields.status = yup.string().nullable();
            break;
        case 'create-league':
            schemaFields.id = yup.number().nullable();
            schemaFields.name = yup.string().min(6, t('league_min')).required(t('forms.required'));
            schemaFields.location = yup.string().nullable();
            schemaFields.description = yup.string().nullable();
            schemaFields.creation_date = yup.date().nullable();
            schemaFields.logo = yup.array().nullable();
            schemaFields.banner = yup.array().nullable();
            schemaFields.status = yup.string().nullable();
            break;
            default:
                schemaFields = yup.mixed();

    }
    return yup.object().shape(schemaFields);

}