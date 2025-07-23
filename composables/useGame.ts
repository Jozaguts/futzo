import type { ActionGameReportState, DialogHandlerActionsNames, FormationPlayer, TeamFormation } from '~/models/Game';
import { useGameStore, useTeamStore } from '~/store';
import { defineAsyncComponent } from '@vue/runtime-core';
import { CARDS, CARDS_STATE, GOALS, GOALS_STATE, SUBSTITUTIONS, SUBSTITUTIONS_STATE } from '~/utils/constants';
import { useToast } from '~/composables/useToast';

export const useGame = () => {
  const { homeFormation, awayFormation } = storeToRefs(useTeamStore());
  const { game } = storeToRefs(useGameStore());
  const dialogState = ref<ActionGameReportState>({ show: false, title: '', subtitle: '', type: 'info' });
  const asyncComponents: Record<DialogHandlerActionsNames, Component> = {
    goals: defineAsyncComponent(() => import('~/components/pages/calendario/game-report/sections/goals.vue')),
    substitutions: defineAsyncComponent(
      () => import('~/components/pages/calendario/game-report/sections/substitutions.vue')
    ),
    cards: defineAsyncComponent(() => import('~/components/pages/calendario/game-report/sections/cards.vue')),
  };
  const componentToRender = ref<keyof typeof asyncComponents>(GOALS);
  const currentComponent = computed(() => {
    return asyncComponents[componentToRender.value];
  });
  const canMakeChanges = computed(() => {
    return (
      teamHeadLinesCount(homeFormation.value) >= 7 &&
      teamHeadLinesCount(homeFormation.value) <= 11 &&
      teamHeadLinesCount(awayFormation.value) >= 7 &&
      teamHeadLinesCount(awayFormation.value) <= 11
    );
  });
  const teamHeadLinesCount = (teamFormation: TeamFormation): number => {
    let count = 0;
    for (let key in teamFormation) {
      if (key === 'defenses' || key === 'midfielders' || key === 'forwards' || key === 'goalkeeper') {
        count += countHeadlines(teamFormation[key]);
      }
    }
    return count;
  };
  const countHeadlines = (playersGroup: FormationPlayer[]) => {
    return playersGroup?.reduce((acc, player) => {
      return acc + (player.name ? 1 : 0);
    }, 0);
  };
  const dialogHandler = (type: DialogHandlerActionsNames) => {
    if (type === GOALS) {
      dialogState.value = GOALS_STATE;
      componentToRender.value = GOALS;
    } else if (type === CARDS) {
      dialogState.value = CARDS_STATE;
      componentToRender.value = CARDS;
    } else if (type === SUBSTITUTIONS) {
      dialogState.value = SUBSTITUTIONS_STATE;
      componentToRender.value = SUBSTITUTIONS;
    }
    if (canMakeChanges.value) {
      dialogState.value.show = true;
    } else {
      useToast().toast('error', 'No puedes hacer cambios', 'Debes tener minino 7 titulares por equipo');
    }
  };
  const updateDefaultFormationType = (isHome: boolean, team_id: number, formation_id: number) => {
    useTeamStore()
      .updateGameTeamFormationType(team_id, game.value.id, formation_id)
      .then(() => {
        useGameStore()
          .initializeGameReport(game.value.id)
          .then((initialize) => {
            useTeamStore().initReportHandler(initialize);
          });
      });
  };
  return {
    canMakeChanges,
    dialogState,
    asyncComponents,
    componentToRender,
    currentComponent,
    dialogHandler,
    updateDefaultFormationType,
  };
};
