import type { Match } from '~/models/Schedule';
import type { Tournament } from '~/models/tournament';

export const useSchedulePenaltyRules = (tournament: Ref<Tournament | null | undefined>) => {
  const eliminationPhaseNames = [
    'Dieciseisavos de Final',
    'Octavos de Final',
    'Cuartos de Final',
    'Semifinales',
    'Final',
  ];

  const ensurePenaltyStructure = (game: Match) => {
    if (!game.penalties) {
      game.penalties = {
        decided: false,
        home_goals: null,
        away_goals: null,
        winner_team_id: null,
      };
    }
  };

  const isEliminationGame = (game: Match) => eliminationPhaseNames.includes(game.phase?.name ?? '');

  const canApplyPenaltyRule = (game: Match) => Boolean(tournament.value?.penalty_draw_enabled) && !isEliminationGame(game);

  const requiresPenalty = (game: Match) => canApplyPenaltyRule(game) && game.home.goals === game.away.goals;

  const shouldShowPenaltyInputs = (game: Match, isEditable: boolean) =>
    isEditable && (requiresPenalty(game) || Boolean(game.penalties?.decided));

  const resetPenaltyData = (game: Match) => {
    ensurePenaltyStructure(game);
    game.penalties.decided = false;
    game.penalties.home_goals = null;
    game.penalties.away_goals = null;
    game.penalties.winner_team_id = null;
  };

  const penaltyWinnerName = (game: Match) => {
    if (game.penalties?.winner_team_id === game.home.id) {
      return game.home.name;
    }
    if (game.penalties?.winner_team_id === game.away.id) {
      return game.away.name;
    }
    return 'Por definir';
  };

  const buildPenaltyPayload = (game: Match) => {
    if (!canApplyPenaltyRule(game)) {
      return null;
    }

    if (!(requiresPenalty(game) || game.penalties?.decided)) {
      return null;
    }

    const homeGoals = Number(game.penalties?.home_goals);
    const awayGoals = Number(game.penalties?.away_goals);
    const winnerId = Number(game.penalties?.winner_team_id);

    if (!Number.isFinite(homeGoals) || !Number.isFinite(awayGoals) || !Number.isFinite(winnerId)) {
      return null;
    }

    return {
      decided: true,
      home_goals: homeGoals,
      away_goals: awayGoals,
      winner_team_id: winnerId,
    };
  };

  return {
    ensurePenaltyStructure,
    canApplyPenaltyRule,
    requiresPenalty,
    shouldShowPenaltyInputs,
    resetPenaltyData,
    penaltyWinnerName,
    buildPenaltyPayload,
  };
};
