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
    const yusString =  () =>{
        return yup.string().test('no-leading-space', 'No se permite espacio en blanco al inicio', value => {
                if (value && value.startsWith(' ')) {
                    return false;
                }
                return true;
            }
        )
    }
    switch (name) {
        case 'create-tournament':
            schemaFields.name = yusString().min(6, t('tournament_min')).required(t('forms.required'));
            schemaFields.start_date = yup.date().nullable();
            schemaFields.end_date = yup.date().nullable();
            schemaFields.prize =  yusString().nullable();
            schemaFields.winner = yusString().nullable();
            schemaFields.description = yusString().nullable();
            schemaFields.status = yusString().nullable();
            schemaFields.category = yup.number().required(t('forms.required'));
            break;
        case 'create-league':
            schemaFields.id = yusString().nullable();
            schemaFields.name = yusString().min(6, t('league_min')).required(t('forms.required'));
            schemaFields.location = yusString().nullable();
            schemaFields.description = yusString().nullable();
            schemaFields.creation_date = yup.date().nullable();
            schemaFields.football_type_id = yup.number().required(t('forms.required'));
            schemaFields.logo = yup.mixed()
                .test('File is required', 'File ', (value: File) => value)
            schemaFields.banner = yup.mixed()
                .test('File is required', 'File ', (value: File) => value)
            schemaFields.status = yusString().nullable();
            break;
        case 'create-category':
            schemaFields.name = yusString().required(t('forms.required'));
            schemaFields.age_range = yusString()
                .matches(/^(\d{2}-\d{2}|\*)$/, "El formato debe ser 'NN-NN' donde N es un dígito, o '*' para edad libre.")
                .test('es-rango-valido-o-libre', 'El primer número debe ser menor que el segundo, o usar "*" para edad libre', (value) => {
                    if (!value) return false;
                    if (value === '*') return true;
                    const [inicio, fin] = value.split('-').map(Number);
                    return inicio < fin; // Retorna true si el primer número es menor que el segundo
                });
            schemaFields.gender = yusString().required(t('forms.required'));
            break;
        case 'create-team':
            schemaFields.name = yusString().required(t('forms.required'));
            schemaFields.category_id = yup.number().required(t('forms.required'));
            schemaFields.tournament_id = yup.number().required(t('forms.required'));
            schemaFields.president_name = yusString().required(t('forms.required'));
            schemaFields.coach_name = yusString().required(t('forms.required'));
            schemaFields.phone = yusString().matches(/^\d{10}$/, 'Número de teléfono no es válido').required();
            schemaFields.email = yusString().email();
            schemaFields.address = yusString();
            schemaFields.image = yup.array().nullable();
            schemaFields.location_id = yup.number().nullable();
            break;
            default:
                schemaFields = yup.mixed();

    }
    return yup.object().shape(schemaFields);

}