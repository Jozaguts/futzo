import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect, beforeAll } from 'vitest';
import { nextTick } from 'vue';
import InputAvailabilityDate from '~/components/pages/ubicaciones/stepper/InputAvailabilityDate.vue';
import type { Day } from '~/models/Schedule';
import { ensureVuetifyApp, vuetifyStubs, iconStub } from '../../../../utils/vuetify-stubs';

describe('InputAvailabilityDate', () => {
  beforeAll(() => {
    ensureVuetifyApp();
  });

  const buildDay = (selected: string[] = []): Day => ({
    enabled: selected.length > 0,
    available_range: '08:00 a 12:00',
    label: 'Lunes',
    intervals: [
      { value: '08:00', text: '08:00', selected: selected.includes('08:00'), disabled: false },
      { value: '09:00', text: '09:00', selected: selected.includes('09:00'), disabled: false },
      { value: '10:00', text: '10:00', selected: false, disabled: true },
    ],
  });

  const mountComponent = async (day: Day = buildDay(['08:00'])) =>
    mountSuspended(
      {
        components: { InputAvailabilityDate },
        template: '<v-app><InputAvailabilityDate v-bind="$props" /></v-app>',
        props: {
          day: { type: Object, required: true },
          label: { type: String, required: true },
          weekday: { type: String, required: true },
        },
      },
      {
        props: {
          day,
          label: day.label,
          weekday: 'monday',
        },
        global: {
          stubs: { ...vuetifyStubs, Icon: iconStub },
        },
      }
    );

  it('syncs selectedValues from provided day intervals', async () => {
    const wrapper = await mountComponent(buildDay(['08:00', '09:00']));
    const component = wrapper.getComponent(InputAvailabilityDate);
    expect((component.vm as any).selectedValues).toEqual(['08:00', '09:00']);
  });

  it('emits input-date-changed when selectedValues change', async () => {
    const wrapper = await mountComponent(buildDay());
    const component = wrapper.getComponent(InputAvailabilityDate);

    (component.vm as any).selectedValues = ['08:00'];
    await nextTick();

    expect(component.emitted('input-date-changed')).toBeTruthy();
    const payload = component.emitted('input-date-changed')?.at(-1)?.[0];
    expect(payload).toEqual({ weekday: 'monday', selectedValues: ['08:00'] });
  });

  it('emits select-all and keeps state consistent', async () => {
    const wrapper = await mountComponent(buildDay());
    const component = wrapper.getComponent(InputAvailabilityDate);

    (component.vm as any).selectAll = true;
    await nextTick();

    expect(component.emitted('select-all')).toBeTruthy();
    expect(component.emitted('select-all')?.[0]?.[0]).toEqual({ weekday: 'monday', value: true });

    // Simulate parent response updating props
    await wrapper.setProps({ day: buildDay(['08:00', '09:00']) });
    await nextTick();
    expect((component.vm as any).selectAll).toBe(true);
  });
});
