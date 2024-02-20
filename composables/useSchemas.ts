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
        case 'create-tournament':
            schemaFields.name = yup.string().min(6, t('tournament_min')).required(t('forms.required'));
            schemaFields.start_date = yup.date().nullable();
            schemaFields.end_date = yup.date().nullable();
            schemaFields.prize =  yup.string().nullable();
            schemaFields.winner = yup.string().nullable();
            schemaFields.description = yup.string().nullable();
            schemaFields.status = yup.string().nullable();
            schemaFields.category = yup.number().required(t('forms.required'));
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
        case 'create-category':
            schemaFields.name = yup.string().required(t('forms.required'));
            schemaFields.age_range = yup.string()
                .matches(/^(\d{2}-\d{2}|\*)$/, "El formato debe ser 'NN-NN' donde N es un dígito, o '*' para edad libre.")
                .test('es-rango-valido-o-libre', 'El primer número debe ser menor que el segundo, o usar "*" para edad libre', (value) => {
                    if (!value) return false;
                    if (value === '*') return true;
                    const [inicio, fin] = value.split('-').map(Number);
                    return inicio < fin; // Retorna true si el primer número es menor que el segundo
                });
            schemaFields.gender = yup.string().required(t('forms.required'));
            break;
            default:
                schemaFields = yup.mixed();

    }
    return yup.object().shape(schemaFields);

}