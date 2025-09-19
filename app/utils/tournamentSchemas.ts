// utils/tournamentSchemas.ts
import { object, boolean, array, string, number } from 'yup';
import { toTypedSchema } from '@vee-validate/yup';
export const getSchemaForFormat = (format: string) => {
  switch (format) {
    case 'Torneo de Liga':
      return toTypedSchema(
        object({
          teams_to_next_round: number().required(),
          elimination_round_trip: boolean().required(),
          phases: array()
            .of(
              object({
                id: number().required(),
                name: string().required(),
                is_active: boolean(),
                is_completed: boolean(),
                min_teams_for: number().nullable(),
                rules: object().nullable(),
              })
            )
            .min(1, 'Debes seleccionar la fase "Tabla general"')
            .required(),
        })
      );

    case 'Liga y Eliminatoria':
      return toTypedSchema(
        object({
          teams_to_next_round: number().min(2).required(),
          elimination_round_trip: boolean().required(),
          phases: array()
            .of(
              object({
                id: number().required(),
                name: string().required(),
                is_active: boolean(),
                is_completed: boolean(),
                min_teams_for: number().nullable(),
                rules: object().nullable(),
              })
            )
            .min(1, 'Selecciona al menos una fase para el torneo')
            .required()
            .test('fase-grupos-needs-another', 'Debes elegir al menos una fase más', (value) => {
              if (!value) return false;
              if (['Liga y Eliminatoria', 'Grupos y Eliminatoria'].includes(format)) {
                return value.length >= 2;
              }
              return true;
            })
            .test(
              'fase-chain-validation',
              'Las fases seleccionadas no cumplen con la secuencia obligatoria',
              (value) => {
                if (!value) return false;
                const selected = value.map((f) => f.name);

                if (selected.includes('Octavos de Final')) {
                  return ['Octavos de Final', 'Cuartos de Final', 'Semifinales', 'Final'].every((f) =>
                    selected.includes(f)
                  );
                }
                if (selected.includes('Cuartos de Final')) {
                  return ['Semifinales', 'Final'].every((f) => selected.includes(f));
                }
                if (selected.includes('Semifinales')) {
                  return selected.includes('Final');
                }
                return true;
              }
            ),
        })
      );

    case 'Grupos y Eliminatoria':
      return toTypedSchema(
        object({
          teams_to_next_round: number().min(2).required(),
          elimination_round_trip: boolean().required(),
          phases: array()
            .of(
              object({
                id: number().required(),
                name: string().required(),
                is_active: boolean(),
                is_completed: boolean(),
                min_teams_for: number().nullable(),
                rules: object().nullable(),
              })
            )
            .min(1, 'Selecciona al menos una fase para el torneo')
            .required()
            .test('fase-grupos-needs-another', 'Debes elegir al menos una fase más', (value) => {
              if (!value) return false;
              if (['Liga y Eliminatoria', 'Grupos y Eliminatoria'].includes(format)) {
                return value.length >= 2;
              }
              return true;
            })
            .test(
              'fase-chain-validation',
              'Las fases seleccionadas no cumplen con la secuencia obligatoria',
              (value) => {
                if (!value) return false;
                const selected = value.map((f) => f.name);

                if (selected.includes('Octavos de Final')) {
                  return ['Octavos de Final', 'Cuartos de Final', 'Semifinales', 'Final'].every((f) =>
                    selected.includes(f)
                  );
                }
                if (selected.includes('Cuartos de Final')) {
                  return ['Semifinales', 'Final'].every((f) => selected.includes(f));
                }
                if (selected.includes('Semifinales')) {
                  return selected.includes('Final');
                }
                return true;
              }
            ),
        })
      );

    case 'Eliminatoria':
      return toTypedSchema(
        object({
          teams_to_next_round: number().min(2).required(),
          elimination_round_trip: boolean().required(),
          phases: array()
            .of(
              object({
                id: number().required(),
                name: string().required(),
                is_active: boolean(),
                is_completed: boolean(),
                min_teams_for: number().nullable(),
                rules: object().nullable(),
              })
            )
            .min(1, 'Debes seleccionar la fase "Tabla general"')
            .required(),
        })
      );

    default:
      return toTypedSchema(object({}));
  }
};
