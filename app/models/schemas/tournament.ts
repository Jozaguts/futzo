import * as yup from 'yup';
const { t } = useI18n();

export const createTournamentBasicInfoSchema = yup.object({
  id: yup.number().nullable(),
  name: yup
    .string()
    .test('no-leading-space', 'No se permite espacio en blanco al inicio', (value) => {
      return !(value && value.startsWith(' '));
    })
    .required(t('forms.required')),
  image: yup
    .mixed()
    .nullable()
    .test('File is required', 'Solo imágenes .jgp, png, svg ', (value: any) => {
      if (!value) return true;
      return value?.type?.includes('image/') || typeof value === 'string';
    }),
  min_max: yup
    .array()
    .required(t('forms.required'))
    .default([8, 30])
    .test('min_max', 'El mínimo debe ser menor que el máximo', function (value) {
      return value[0] < value[1];
    }),
  start_date: yup.date().required(),
  end_date: yup.date().nullable(),
  substitutions_per_team: yup.number().required(t('forms.required')),
  category_id: yup.number().required(t('forms.required')),
  tournament_format_id: yup.number().required(t('forms.required')),
  football_type_id: yup.number().required(t('forms.required')),
});
