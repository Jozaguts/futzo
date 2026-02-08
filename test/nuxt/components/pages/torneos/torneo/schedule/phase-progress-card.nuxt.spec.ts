import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest';
import { ref } from 'vue';
import { ensureVuetifyApp, vuetifyStubs } from '../../../../../utils/vuetify-stubs';

const advancePhaseMock = vi.fn();

const scheduleStoreMock = {
  scheduleSettings: ref({ phases: [{ id: 1, name: 'Final' }], can_update_start_date: true, round_trip: false }),
  isAdvancingPhase: ref(false),
  eliminationPhases: ref([{ id: 1, name: 'Final', is_active: true }]),
  activePhase: ref({ id: 1, name: 'Final' }),
  activeEliminationPhase: ref({ id: 1, name: 'Final' }),
  upcomingEliminationPhase: ref(null),
  nextPhase: ref(null),
  isFinalPhaseActive: ref(true),
  hasActivePhaseMatches: ref(true),
  areActivePhaseMatchesProgrammed: ref(true),
  areActivePhaseMatchesCompleted: ref(false),
  isActivePhaseConfigurationLocked: ref(false),
  teamsWithoutGames: ref([]),
  pendingManualMatches: ref(0),
  hasPendingManualMatches: ref(false),
  regenerationAnalysis: ref(null),
  isAnalyzingRegeneration: ref(false),
  isConfirmingRegeneration: ref(false),
  lastRegeneration: ref(null),
  scheduleDrawerOpen: ref(false),
  resetRegenerationState: vi.fn(),
  analyzeScheduleRegeneration: vi.fn(),
  confirmScheduleRegeneration: vi.fn(),
  advanceTournamentPhase: advancePhaseMock,
};

mockNuxtImport('useScheduleStore', () => () => scheduleStoreMock);

let PhaseProgressCard: any;

describe('PhaseProgressCard', () => {
  beforeAll(async () => {
    ensureVuetifyApp();
    PhaseProgressCard = (await import('~/components/pages/torneos/torneo/schedule/phase-progress-card.vue')).default;
  });

  beforeEach(() => {
    advancePhaseMock.mockClear();
    scheduleStoreMock.isAdvancingPhase.value = false;
    scheduleStoreMock.nextPhase.value = null;
    scheduleStoreMock.isFinalPhaseActive.value = true;
    scheduleStoreMock.hasActivePhaseMatches.value = true;
    scheduleStoreMock.areActivePhaseMatchesProgrammed.value = true;
    scheduleStoreMock.areActivePhaseMatchesCompleted.value = false;
    scheduleStoreMock.isActivePhaseConfigurationLocked.value = false;
  });

  const mountComponent = () =>
    mountSuspended(
      {
        components: { PhaseProgressCard },
        template: '<v-app><PhaseProgressCard /></v-app>',
      },
      {
        global: {
          stubs: {
            ...vuetifyStubs,
            PrimaryBtn: {
              props: ['text', 'disabled', 'loading'],
              emits: ['click'],
              template:
                '<button class="primary-btn" :data-test="text" :disabled="disabled || loading" @click="$emit(\'click\')">{{ text }}</button>',
            },
            BaseLabelInput: {
              props: ['label', 'modelValue'],
              template: '<div class="base-label-input">{{ label }}: {{ modelValue }}</div>',
            },
          },
        },
      }
    );

  it('muestra "Finalizar torneo" y deshabilita avanzar cuando la final aún no se completa', async () => {
    const wrapper = await mountComponent();
    const primaryButton = wrapper.find('.primary-btn');

    expect(primaryButton.text()).toBe('Finalizar torneo');
    expect(primaryButton.attributes('disabled')).toBeDefined();
    await primaryButton.trigger('click');
    expect(advancePhaseMock).not.toHaveBeenCalled();
  });

  it('habilita finalizar torneo y bloquea la configuración cuando los partidos están completados', async () => {
    scheduleStoreMock.areActivePhaseMatchesProgrammed.value = false;
    scheduleStoreMock.areActivePhaseMatchesCompleted.value = true;
    scheduleStoreMock.isActivePhaseConfigurationLocked.value = true;

    const wrapper = await mountComponent();
    const primaryButton = wrapper.find('.primary-btn');

    expect(primaryButton.attributes('disabled')).toBeUndefined();
    await primaryButton.trigger('click');
    const confirmButton = wrapper
      .findAll('.v-btn')
      .find((button) => button.text().includes('Finalizar torneo') || button.text().includes('Avanzar'));
    expect(confirmButton).toBeTruthy();
    await confirmButton!.trigger('click');
    expect(advancePhaseMock).toHaveBeenCalledTimes(1);

    const configureButton = wrapper.find('[data-test="Configurar"]');
    expect(configureButton.attributes('disabled')).toBeDefined();
  });
});
