import type { EliminationPayload, EliminationPhase, EliminationRules } from '~/models/Schedule';

export function buildEliminationPayload(
  format: string,
  tournamentId: number,
  phases: EliminationPhase[],
  opts?: {
    teams_to_next_round?: number;
    round_trip?: boolean;
    group_phase?: EliminationPayload['group_phase'];
  }
): EliminationPayload {
  // valores por defecto
  const baseRoundTrip = opts?.round_trip ?? false;
  const teamsNext = opts?.teams_to_next_round ?? 1;

  const withRules = (phaseName: string, isFinal = false): EliminationRules => {
    return {
      round_trip: !isFinal,
      away_goals: format === 'Grupos y Eliminatoria',
      extra_time: true,
      penalties: true,
      advance_if_tie: isFinal ? 'none' : 'better_seed',
    };
  };

  switch (format) {
    case 'Torneo de Liga':
      return {
        teams_to_next_round: 1,
        round_trip: false,
        elimination_round_trip: false,
        phases: phases
          .filter((p) => p.name === 'Tabla general')
          .map((p) => ({
            ...p,
            tournament_id: tournamentId,
            is_active: true,
            rules: null,
          })),
      };

    case 'Liga y Eliminatoria':
      return {
        teams_to_next_round: teamsNext,
        round_trip: true,
        elimination_round_trip: false,
        phases: phases.map((p) => {
          if (p.name === 'Tabla general') {
            return { ...p, tournament_id: tournamentId, is_active: true, rules: null };
          }
          return {
            ...p,
            tournament_id: tournamentId,
            rules: withRules(p.name, p.name === 'Final'),
          };
        }),
      };

    case 'Grupos y Eliminatoria':
      return {
        teams_to_next_round: teamsNext,
        round_trip: true,
        elimination_round_trip: false,
        phases: phases.map((p) => {
          if (p.name === 'Fase de grupos') {
            return { ...p, tournament_id: tournamentId, is_active: true, rules: null };
          }
          return {
            ...p,
            tournament_id: tournamentId,
            rules: withRules(p.name, p.name === 'Final'),
          };
        }),
        group_phase: opts?.group_phase ?? {
          option_id: null,
        },
      };

    case 'Eliminatoria':
      return {
        teams_to_next_round: teamsNext,
        round_trip: false,
        elimination_round_trip: false,
        phases: phases.map((p) => ({
          ...p,
          tournament_id: tournamentId,
          rules: {
            round_trip: false,
            away_goals: false,
            extra_time: true,
            penalties: true,
            advance_if_tie: 'none',
          },
        })),
      };

    default:
      throw new Error(`Formato no soportado: ${format}`);
  }
}
