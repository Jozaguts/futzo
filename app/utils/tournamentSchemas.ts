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
          elimination_round_trip: boolean().nullable(),
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
          elimination_round_trip: boolean().nullable(),
          phases: array()
            .of(
              phaseBaseSchema.when('name', {
                is: (name: string) =>
                  ['Dieciseisavos de Final', 'Octavos de Final', 'Cuartos de Final', 'Semifinales', 'Final'].includes(
                    name
                  ),
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
              (value, ctx) => {
                if (!value) return false;
                // Filter active phases only
                const active = value.filter((f) => f.is_active).map((f) => f.name);

                // Helper to check if all required phases are active
                const requireAllActive = (required: string[]) => {
                  const missing = required.filter((f) => !active.includes(f));
                  return { ok: missing.length === 0, missing };
                };

                if (active.includes('Dieciseisavos de Final')) {
                  const { ok, missing } = requireAllActive([
                    'Dieciseisavos de Final',
                    'Octavos de Final',
                    'Cuartos de Final',
                    'Semifinales',
                    'Final',
                  ]);
                  if (!ok) {
                    return ctx.createError({
                      message: `Las fases: ${missing.join(', ')} son obligatorias`,
                    });
                  }
                }

                // Octavos
                if (active.includes('Octavos de Final')) {
                  const { ok, missing } = requireAllActive([
                    'Octavos de Final',
                    'Cuartos de Final',
                    'Semifinales',
                    'Final',
                  ]);
                  if (!ok) {
                    return ctx.createError({
                      message: `Las fases: ${missing.join(', ')} son obligatorias`,
                    });
                  }
                }

                // Cuartos
                if (active.includes('Cuartos de Final')) {
                  const { ok, missing } = requireAllActive(['Cuartos de Final', 'Semifinales', 'Final']);
                  if (!ok) {
                    return ctx.createError({
                      message: `Las fases: ${missing.join(', ')} son obligatorias`,
                    });
                  }
                }

                // Semifinales
                if (active.includes('Semifinales')) {
                  const { ok, missing } = requireAllActive(['Semifinales', 'Final']);
                  if (!ok) {
                    return ctx.createError({
                      message: `Las fases: ${missing.join(', ')} son obligatorias`,
                    });
                  }
                }

                // Final
                if (active.includes('Final')) {
                  const { ok, missing } = requireAllActive(['Final']);
                  if (!ok) {
                    return ctx.createError({
                      message: `Las fases: ${missing.join(', ')} son obligatorias`,
                    });
                  }
                }

                return true; // if none of the knockout phases are active
              }
            ),
        })
      );

    case 'Grupos y Eliminatoria':
      return toTypedSchema(
        object({
          teams_to_next_round: number().min(2, 'Activa al menos 2 fases para el torneo').required(),
          elimination_round_trip: boolean().nullable(),
          phases: array()
            .of(
              phaseBaseSchema.when('name', {
                is: (name: string) =>
                  ['Dieciseisavos de Final', 'Octavos de Final', 'Cuartos de Final', 'Semifinales', 'Final'].includes(
                    name
                  ),
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
              (value, ctx) => {
                if (!value) return false;
                // Filter active phases only
                const active = value.filter((f) => f.is_active).map((f) => f.name);

                // Helper to check if all required phases are active
                const requireAllActive = (required: string[]) => {
                  const missing = required.filter((f) => !active.includes(f));
                  return { ok: missing.length === 0, missing };
                };

                if (active.includes('Dieciseisavos de Final')) {
                  const { ok, missing } = requireAllActive([
                    'Dieciseisavos de Final',
                    'Octavos de Final',
                    'Cuartos de Final',
                    'Semifinales',
                    'Final',
                  ]);
                  if (!ok) {
                    return ctx.createError({
                      message: `Las fases: ${missing.join(', ')} son obligatorias`,
                    });
                  }
                }

                // Octavos
                if (active.includes('Octavos de Final')) {
                  const { ok, missing } = requireAllActive([
                    'Octavos de Final',
                    'Cuartos de Final',
                    'Semifinales',
                    'Final',
                  ]);
                  if (!ok) {
                    return ctx.createError({
                      message: `Las fases: ${missing.join(', ')} son obligatorias`,
                    });
                  }
                }

                // Cuartos
                if (active.includes('Cuartos de Final')) {
                  const { ok, missing } = requireAllActive(['Cuartos de Final', 'Semifinales', 'Final']);
                  if (!ok) {
                    return ctx.createError({
                      message: `Las fases: ${missing.join(', ')} son obligatorias`,
                    });
                  }
                }

                // Semifinales
                if (active.includes('Semifinales')) {
                  const { ok, missing } = requireAllActive(['Semifinales', 'Final']);
                  if (!ok) {
                    return ctx.createError({
                      message: `Las fases: ${missing.join(', ')} son obligatorias`,
                    });
                  }
                }

                // Final
                if (active.includes('Final')) {
                  const { ok, missing } = requireAllActive(['Final']);
                  if (!ok) {
                    return ctx.createError({
                      message: `Las fases: ${missing.join(', ')} son obligatorias`,
                    });
                  }
                }

                return true; // if none of the knockout phases are active
              }
            ),
          group_phase: object({
            option_id: string().required('Seleccione la cantidad de equipos por grupo'),
          }),
        })
      );

    case 'Eliminatoria':
      return toTypedSchema(
        object({
          teams_to_next_round: number().min(2).required(),
          elimination_round_trip: boolean().nullable(),
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
