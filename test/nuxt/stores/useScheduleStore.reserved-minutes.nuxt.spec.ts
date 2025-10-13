import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest';
import { ref, nextTick } from 'vue';
import { createPinia, setActivePinia } from 'pinia';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { useScheduleStore } from '~/stores/useScheduleStore';
import type { Day, LocationFieldsRequest, WeekDay } from '~/models/Schedule';

const toastMock = vi.fn();

mockNuxtImport('useTournamentStore', () => () => ({ tournamentId: ref(7) }));
mockNuxtImport('useToast', () => () => ({ toast: toastMock }));
mockNuxtImport('useSanctumClient', () => () => vi.fn());
mockNuxtImport('useApiError', () => () => ({ message: '' }));

const INTERVALS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];

const buildDay = (label: Day['label'], selectedValues: string[] = []): Day => ({
  enabled: selectedValues.length > 0,
  available_range: '08:00 a 18:00',
  label,
  intervals: INTERVALS.map((value) => ({
    value,
    text: value,
    selected: selectedValues.includes(value),
    disabled: false,
  })),
});

const buildField = (selectedMap: Partial<Record<WeekDay, string[]>> = {}): LocationFieldsRequest => ({
  field_id: 1,
  field_name: 'Field 1',
  location_name: 'Location 1',
  location_id: 10,
  step: 1,
  disabled: false,
  availability: {
    monday: buildDay('Lunes', selectedMap.monday ?? []),
    tuesday: buildDay('Martes', selectedMap.tuesday ?? []),
    wednesday: buildDay('Miércoles', selectedMap.wednesday ?? []),
    thursday: buildDay('Jueves', selectedMap.thursday ?? []),
    friday: buildDay('Viernes', selectedMap.friday ?? []),
    saturday: buildDay('Sábado', selectedMap.saturday ?? []),
    sunday: buildDay('Domingo', selectedMap.sunday ?? []),
    isCompleted: false,
  },
});

describe('useScheduleStore reservedMinutesPerWeek', () => {
  beforeAll(() => {
    // no-op, mocks registered via mockNuxtImport above
  });

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('counts the minutes of a single contiguous range', async () => {
    const store = useScheduleStore();
    store.scheduleStoreRequest.fields_phase = [buildField({ monday: ['10:00', '11:00'] })];

    await nextTick();

    expect(store.reservedMinutesPerWeek).toBe(120);
  });

  it('sums minutes across different days', async () => {
    const store = useScheduleStore();
    store.scheduleStoreRequest.fields_phase = [
      buildField({
        monday: ['10:00', '11:00'],
        tuesday: ['12:00', '13:00'],
      }),
    ];

    await nextTick();

    expect(store.reservedMinutesPerWeek).toBe(240);
  });
});
