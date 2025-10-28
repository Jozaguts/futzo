import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest';
import { ref } from 'vue';
import { ensureVuetifyApp, vuetifyStubs, iconStub } from '../../../utils/vuetify-stubs';

const scheduleStoreMock = {
  scheduleDialog: ref(false),
  isLoadingSchedules: ref(false),
  noSchedules: ref(true),
  schedulePagination: ref({ filterBy: undefined }),
  hasSchedule: ref(false),
  settingsSchedule: vi.fn(),
};

mockNuxtImport('useScheduleStore', () => () => scheduleStoreMock);

const tournamentRef = ref<{ status: string; winner: string | null }>({ status: 'en curso', winner: null });

mockNuxtImport('useTournamentStore', () => () => ({
  tournament: tournamentRef,
}));

let NoCalendar: any;

describe('NoCalendar component', () => {
  beforeAll(async () => {
    ensureVuetifyApp();
    NoCalendar = (await import('~/components/pages/torneos/no-calendar.vue')).default;
  });

  beforeEach(() => {
    scheduleStoreMock.isLoadingSchedules.value = false;
    scheduleStoreMock.noSchedules.value = true;
    scheduleStoreMock.hasSchedule.value = false;
    scheduleStoreMock.schedulePagination.value = { filterBy: undefined };
    scheduleStoreMock.settingsSchedule.mockClear();
    tournamentRef.value = { status: 'en curso', winner: null };
  });

  const mountComponent = () =>
    mountSuspended(
      {
        components: { NoCalendar },
        template: '<v-app><NoCalendar /></v-app>',
      },
      {
        global: {
          stubs: {
            ...vuetifyStubs,
            NoCalendarSvg: { template: '<div data-test="svg-placeholder"></div>' },
            Icon: iconStub,
          },
        },
      }
    );

  it('muestra el mensaje de torneo finalizado y el campeón', async () => {
    tournamentRef.value = { status: 'completado', winner: 'Atlético Futzo' };

    const wrapper = await mountComponent();

    expect(wrapper.text()).toContain('Torneo finalizado');
    expect(wrapper.text()).toContain('Campeón: Atlético Futzo');
    expect(wrapper.find('[data-test="svg-placeholder"]').exists()).toBe(false);
    expect(wrapper.find('button').exists()).toBe(false);
  });

  it('mantiene el flujo original cuando no hay campeón', async () => {
    const wrapper = await mountComponent();

    expect(wrapper.text()).toContain('No hay calendario aún');
    expect(wrapper.find('[data-test="svg-placeholder"]').exists()).toBe(true);
    expect(wrapper.find('button').exists()).toBe(true);
  });
});
