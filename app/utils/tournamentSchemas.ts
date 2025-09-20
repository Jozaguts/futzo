// utils/tournamentSchemas.ts
import { object, boolean, array, string, number } from 'yup';
import { toTypedSchema } from '@vee-validate/yup';

const phaseBaseSchema = object({
  id: number().required(),
  name: string().required(),
  is_active: boolean(),
  is_completed: boolean(),
  min_teams_for: number().nullable(),
  rules: object().nullable(), // 👈 permitido null
});

const phaseWithRulesSchema = phaseBaseSchema.shape({
  rules: object({
    round_trip: boolean().required(),
    away_goals: boolean().required(),
    extra_time: boolean().required(),
    penalties: boolean().required(),
    advance_if_tie: string().oneOf(['better_seed', 'none']).required(),
  }).required(), // 👈 aquí sí obligatorio
});
export const getSchemaForFormat = (format: string, total_teams: number) => {
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
              phaseBaseSchema.when('name', {
                is: (name: string) => ['Octavos de Final', 'Cuartos de Final', 'Semifinales', 'Final'].includes(name),
                then: () => phaseWithRulesSchema, // si es KO → exige rules
                otherwise: () => phaseBaseSchema, // si es Fase de grupos / Tabla general → rules puede ser null
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

          group_phase: object({
            teams_per_group: number()
              .required()
              .min(2, 'Debe haber al menos 2 equipos por grupo')
              .test(
                'divides-exactly',
                `El número de equipos ${total_teams} no se puede dividir en grupos iguales`,
                function (value) {
                  console.log(total_teams);
                  if (!value || !total_teams) return false;
                  return total_teams % value === 0;
                }
              )
              .test(
                'not-more-than-half',
                'Los equipos por grupo no pueden ser más de la mitad del total',
                function (value) {
                  if (!value || !total_teams) return false;
                  return value <= total_teams / 2;
                }
              )
              .test('even-number-of-groups', 'El número de grupos debe ser par', function (value) {
                if (!value || !total_teams) return false;
                return (total_teams / value) % 2 === 0;
              }),
            advance_top_n: number()
              .required()
              .min(1, 'Debe avanzar al menos un equipo')
              .test('advance-less-than-teams', 'No pueden avanzar todos los equipos del grupo', function (value) {
                const { teams_per_group } = this.parent;
                if (!value || !teams_per_group) return false;
                return value < teams_per_group;
              }),
            include_best_thirds: boolean()
              .required()
              .test('only-when-advance-2', 'Solo se permite mejores terceros si avanzan 2 por grupo', function (value) {
                const { advance_top_n } = this.parent;
                if (!value) return true; // si es false, no pasa nada
                return advance_top_n === 2;
              }),
            best_thirds_count: number()
              .nullable()
              .test('only-if-include-best-thirds', 'Debe estar vacío si no hay mejores terceros', function (value) {
                const { include_best_thirds, advance_top_n, best_thirds_count } = this.parent;
                if (!include_best_thirds || advance_top_n !== 2) return value == null;
                return true;
              })
              .test(
                'valid-total-advancing',
                'El total de clasificados debe permitir cuadro de eliminación',
                function (value) {
                  const { total_teams, teams_per_group, advance_top_n, include_best_thirds } = this.parent;
                  if (!teams_per_group || !advance_top_n) return false;
                  const num_groups = total_teams / teams_per_group;
                  let total_advancing = num_groups * advance_top_n;
                  //todo  esta validacion no esta funcionadl reviar
                  if (include_best_thirds && advance_top_n === 2 && value) {
                    total_advancing += value;
                  }

                  // El total debe ser potencia de 2 (8,16,32…)
                  const isPowerOfTwo = (n: number) => (n & (n - 1)) === 0;
                  return isPowerOfTwo(total_advancing);
                }
              ),
          }),
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
