import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, it, expect, beforeEach, beforeAll, vi } from 'vitest';
import { ref, computed } from 'vue';
import { flushPromises } from '@vue/test-utils';
import type { Day, LocationFieldsRequest } from '~/models/Schedule';
import { ensureVuetifyApp, iconStub, vuetifyStubs } from '../../../../../utils/vuetify-stubs';

const clientMock = vi.fn();

mockNuxtImport('useSanctumClient', () => () => clientMock);
mockNuxtImport('useI18n', () => () => ({ t: (key: string) => key }));

const scheduleStoreRequest = ref<{
  general: { locations: Array<{ id: number }> };
  fields_phase: LocationFieldsRequest[];
}>({
  general: { locations: [{ id: 1 }] },
  fields_phase: [],
});
const hasEnoughCapacity = ref(true);
const reservedMinutesPerWeek = ref(540);
const requiredMinutesPerRound = ref(480);
const matchDurationMins = computed(() => 90);
const matchesPerRound = computed(() => 4);

mockNuxtImport('useScheduleStore', () => () => ({
  scheduleStoreRequest,
  hasEnoughCapacity,
  reservedMinutesPerWeek,
  requiredMinutesPerRound,
  matchDurationMins,
  matchesPerRound,
}));

const tournamentId = ref(7);
mockNuxtImport('useTournamentStore', () => () => ({ tournamentId }));

let FieldsPhase: any;

describe('FieldsPhase Stepper (Step 4)', () => {
  beforeAll(async () => {
    ensureVuetifyApp();
    FieldsPhase = (await import('~/components/pages/torneos/calendario/stepper/04-fields-phase.vue')).default;
  });

  beforeEach(() => {
    scheduleStoreRequest.value = {
      general: { locations: [{ id: 1 }] },
      fields_phase: [],
    };
    clientMock.mockReset();
    clientMock.mockResolvedValue([buildField(1, 1), buildField(2, 2)]);
  });

  const mountComponent = async () =>
    mountSuspended(
      {
        components: { FieldsPhase },
        template: '<v-app><FieldsPhase /></v-app>',
      },
      {
        global: {
          stubs: { ...vuetifyStubs, Icon: iconStub },
          config: {
            globalProperties: {
              $vuetify: { display: { mobile: false } },
            },
          },
        },
      }
    );

  it('loads fields from API and syncs schedule store', async () => {
    const wrapper = await mountComponent();
    await flushPromises();

    expect(clientMock).toHaveBeenCalledTimes(1);
    expect(scheduleStoreRequest.value.fields_phase.length).toBe(2);
    expect(scheduleStoreRequest.value.fields_phase[0].availability.isCompleted).toBe(false);
  });

  it('selects intervals using start and end selects', async () => {
    const wrapper = await mountComponent();
    await flushPromises();

    const startSelect = findSelect(wrapper, 'start-select-1-monday');
    const endSelect = findSelect(wrapper, 'end-select-1-monday');
    startSelect.vm.$emit('update:modelValue', '08:00');
    await flushPromises();
    endSelect.vm.$emit('update:modelValue', '10:00');
    await flushPromises();

    const mondayIntervals = scheduleStoreRequest.value.fields_phase[0].availability.monday.intervals;
    expect(mondayIntervals[0].selected).toBe(true);
    expect(mondayIntervals[1].selected).toBe(true);
    expect(mondayIntervals[2].selected).toBe(true);
    expect(mondayIntervals[0].value).toBe('08:00');
    expect(mondayIntervals[1].value).toBe('09:00');
    expect(mondayIntervals[2].value).toBe('10:00');
    expect(endSelect.attributes()['data-model-value']).toBe('10:00');
    expect(wrapper.text()).not.toContain('La hora de fin debe ser posterior a la hora de inicio');
  });

  it('ignores invalid end selections earlier than start', async () => {
    const wrapper = await mountComponent();
    await flushPromises();

    const startSelect = findSelect(wrapper, 'start-select-1-monday');
    const endSelect = findSelect(wrapper, 'end-select-1-monday');
    startSelect.vm.$emit('update:modelValue', '08:00');
    await flushPromises();
    endSelect.vm.$emit('update:modelValue', '10:00');
    await flushPromises();

    const previousModel = endSelect.attributes()['data-model-value'];
    endSelect.vm.$emit('update:modelValue', '07:00');
    await flushPromises();

    expect(endSelect.attributes()['data-model-value']).toBe(previousModel);
  });

  it('clears the selected intervals and toggles availability state', async () => {
    const wrapper = await mountComponent();
    await flushPromises();

    const startSelect = findSelect(wrapper, 'start-select-1-monday');
    const endSelect = findSelect(wrapper, 'end-select-1-monday');
    startSelect.vm.$emit('update:modelValue', '08:00');
    await flushPromises();
    endSelect.vm.$emit('update:modelValue', '10:00');
    await flushPromises();

    const clearButton = findButton(wrapper, 'clear-select-1-monday');
    await clearButton.trigger('click');
    await flushPromises();

    expect(wrapper.text()).toContain('No disponible');

    const enableButton = findButton(wrapper, 'enable-select-1-monday');
    await enableButton.trigger('click');
    await flushPromises();

    expect(findSelect(wrapper, 'start-select-1-monday')).toBeTruthy();
  });
});

const buildDay = (label: Day['label'], selected = false): Day => {
  const day = {
    enabled: true,
    available_range: '08:00 a 12:00',
    label,
    intervals: [
      { value: '08:00', text: '08:00', selected, disabled: false },
      { value: '09:00', text: '09:00', selected: false, disabled: false },
      { value: '10:00', text: '10:00', selected: false, disabled: false },
    ],
    mobile_label: label,
  } as Day & { mobile_label: string };
  return day;
};

const buildField = (id: number, step: number): LocationFieldsRequest => ({
  field_id: id,
  field_name: `Field ${id}`,
  location_name: `Location ${id}`,
  location_id: id * 10,
  step,
  disabled: false,
  availability: {
    monday: buildDay('Lunes'),
    tuesday: buildDay('Martes'),
    wednesday: buildDay('Miércoles'),
    thursday: buildDay('Jueves'),
    friday: buildDay('Viernes'),
    saturday: buildDay('Sábado'),
    sunday: buildDay('Domingo'),
    isCompleted: false,
  },
});

const findSelect = (wrapper: any, testId: string) => {
  const select = wrapper
    .findAllComponents({ name: 'StubVSelect' })
    .find((component) => component.attributes()['data-testid'] === testId);
  if (!select) {
    throw new Error(`Select with data-testid="${testId}" not found`);
  }
  return select;
};

const findButton = (wrapper: any, testId: string) => {
  const button = wrapper
    .findAllComponents({ name: 'StubVBtn' })
    .find((component) => component.attributes()['data-testid'] === testId);
  if (!button) {
    throw new Error(`Button with data-testid="${testId}" not found`);
  }
  return button;
};
