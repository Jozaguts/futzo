import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect, beforeAll } from 'vitest';
import { defineComponent } from 'vue';
import LocationFormStep from '~/components/pages/torneos/calendario/location-form-step.vue';
import type { Day, LocationFieldsRequest } from '~/models/Schedule';
import { ensureVuetifyApp, iconStub, vuetifyStubs } from '../../../../utils/vuetify-stubs';

const buildDay = (label: Day['label'], enabled = false, selected = false): Day => ({
  enabled,
  available_range: '08:00 a 12:00',
  label,
  intervals: [
    { value: '08:00', text: '08:00', selected, disabled: false },
    { value: '09:00', text: '09:00', selected: false, disabled: false },
  ],
});

const buildField = (): LocationFieldsRequest => ({
  field_id: 1,
  field_name: 'Field 1',
  location_name: 'Location A',
  location_id: 10,
  step: 1,
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

describe('LocationFormStep', () => {
  beforeAll(() => {
    ensureVuetifyApp();
  });

  const InputAvailabilityDateStub = defineComponent({
    name: 'InputAvailabilityDateStub',
    props: {
      day: { type: Object, required: true },
      label: { type: String, required: true },
      weekday: { type: String, required: true },
      disabled: { type: Boolean, default: false },
    },
    emits: ['input-date-changed', 'select-all'],
    template: `
      <div class="input-availability-date-stub">
        <button class="emit-change" @click="$emit('input-date-changed', { weekday, selectedValues: ['08:00'] })">change</button>
        <button class="emit-clear" @click="$emit('input-date-changed', { weekday, selectedValues: [] })">clear</button>
        <button class="emit-select-all" @click="$emit('select-all', { weekday, value: true })">select all</button>
      </div>
    `,
  });

  const mountComponent = async (field: LocationFieldsRequest = buildField()) =>
    mountSuspended(
      {
        components: { LocationFormStep },
        template: '<v-app><LocationFormStep v-bind="$props" /></v-app>',
        props: {
          field: { type: Object, required: true },
          isLastStep: { type: Boolean, default: false },
        },
      },
      {
        props: {
          field,
          isLastStep: false,
        },
        global: {
          stubs: { ...vuetifyStubs, InputAvailabilityDate: InputAvailabilityDateStub, Icon: iconStub },
        },
      }
    );

  it('emits update with enabled day when intervals are selected', async () => {
    const field = buildField();
    const wrapper = await mountComponent(field);
    const component = wrapper.getComponent(LocationFormStep);

    await wrapper.find('.emit-change').trigger('click');

    const emitted = component.emitted('update')?.at(-1)?.[0] as LocationFieldsRequest | undefined;
    expect(emitted).toBeTruthy();
    expect(emitted!.availability.monday.enabled).toBe(true);
    expect(emitted!.availability.monday.intervals[0].selected).toBe(true);
  });

  it('marks day as inactive when no intervals remain selected', async () => {
    const field = buildField();
    field.availability.monday.enabled = true;
    field.availability.monday.intervals[0].selected = true;

    const wrapper = await mountComponent(field);
    const component = wrapper.getComponent(LocationFormStep);

    await wrapper.find('.emit-clear').trigger('click');

    const emitted = component.emitted('update')?.at(-1)?.[0] as LocationFieldsRequest | undefined;
    expect(emitted).toBeTruthy();
    expect(emitted!.availability.monday.enabled).toBe(false);
    expect(emitted!.availability.monday.intervals.every((interval) => !interval.selected)).toBe(true);
  });

  it('emits select-all updates with the correct payload', async () => {
    const field = buildField();
    const wrapper = await mountComponent(field);
    const component = wrapper.getComponent(LocationFormStep);

    await wrapper.find('.emit-select-all').trigger('click');

    const emitted = component.emitted('update')?.at(-1)?.[0] as LocationFieldsRequest | undefined;
    expect(emitted).toBeTruthy();
    expect(emitted!.availability.monday.enabled).toBe(true);
    expect(emitted!.availability.monday.intervals.every((interval) => interval.selected || interval.disabled)).toBe(true);
  });

  it('forwards navigation events', async () => {
    const wrapper = await mountComponent();
    const component = wrapper.getComponent(LocationFormStep);

    await wrapper.find('.vertical-stepper-button.back').trigger('click');
    await wrapper.find('.vertical-stepper-button.next').trigger('click');

    expect(component.emitted('back')).toBeTruthy();
    const nextPayload = component.emitted('next')?.at(-1)?.[0] as any;
    expect(nextPayload).toMatchObject({ field_id: 1, name: 'Field 1' });
  });
});
