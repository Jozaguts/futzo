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
          stubs: { ...vuetifyStubs, LocationFormStep: LocationFormStepStub, Icon: iconStub },
        },
      }
    );

  it('loads fields from API and syncs schedule store', async () => {
    const wrapper = await mountComponent();
    await flushPromises();

    expect(clientMock).toHaveBeenCalledTimes(1);
    expect(scheduleStoreRequest.value.fields_phase.length).toBe(2);
    expect((wrapper.vm as any).currentStep).toBe(1);
  });

  it('updates field data via emitted update event', async () => {
    const wrapper = await mountComponent();
    await flushPromises();

    await wrapper.find('.location-form-step-stub .update').trigger('click');
    await flushPromises();

    expect(scheduleStoreRequest.value.fields_phase[0].field_name).toContain('Updated');
  });

  it('marks field as completed and advances on next', async () => {
    const wrapper = await mountComponent();
    await flushPromises();

    await wrapper.find('.location-form-step-stub .next').trigger('click');
    await flushPromises();

    expect(scheduleStoreRequest.value.fields_phase[0].availability.isCompleted).toBe(true);
    expect((wrapper.vm as any).currentStep).toBe(2);
  });

  it('navigates back to previous step', async () => {
    const wrapper = await mountComponent();
    await flushPromises();

    await wrapper.find('.location-form-step-stub .next').trigger('click');
    await flushPromises();

    const steps = wrapper.findAll('.location-form-step-stub');
    await steps[1].find('.back').trigger('click');
    await flushPromises();

    expect((wrapper.vm as any).currentStep).toBe(1);
  });
});

const buildDay = (label: Day['label'], selected = false): Day => ({
  enabled: selected,
  available_range: '08:00 a 12:00',
  label,
  intervals: [
    { value: '08:00', text: '08:00', selected, disabled: false },
    { value: '09:00', text: '09:00', selected: false, disabled: false },
  ],
});

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

const LocationFormStepStub = {
  name: 'LocationFormStepStub',
  props: {
    field: { type: Object, required: true },
    isLastStep: { type: Boolean, default: false },
  },
  emits: ['next', 'back', 'update'],
  template: `
    <div class="location-form-step-stub">
      <button class="update" @click="$emit('update', { ...field, field_name: field.field_name + ' Updated' })">update</button>
      <button class="next" @click="$emit('next', { field_id: field.field_id, name: field.field_name, availability: field.availability, isCompleted: false })">next</button>
      <button class="back" @click="$emit('back')">back</button>
    </div>
  `,
};
