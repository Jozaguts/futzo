// @vitest-environment nuxt
import { it, expect, describe, beforeEach } from 'vitest';
import { registerEndpoint } from '@nuxt/test-utils/runtime';
import { readBody, readRawBody } from 'h3';

// Mock simple de POST /tournaments que “guarda” y devuelve el torneo
const installTournamentCreateMock = () => {
  let lastPayload: any = null;
  registerEndpoint('/api/v1/admin/tournaments', {
    method: 'POST',
    handler: async (event) => {
      // Soporta body JSON o raw string
      let body: any = await readBody(event);
      if (!body) {
        const raw = await readRawBody(event);
        if (raw) {
          try {
            body = JSON.parse(raw.toString());
          } catch (e) {
            body = null;
          }
        }
      }
      lastPayload = body;
      // Minimal response, como hace el backend
      return {
        id: Math.floor(Math.random() * 1000) + 1,
        name: body.basic.name,
        tournament_format_id: body.basic.tournament_format_id,
        football_type_id: body.basic.football_type_id,
        category_id: body.basic.category_id,
        start_date: body.basic.start_date,
        end_date: body.basic.end_date,
      };
    },
  });
  return () => lastPayload;
};

const buildPayload = (formatId: number) => ({
  basic: {
    name: `Torneo ${formatId} - test`,
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA', // mock
    tournament_format_id: formatId, // 1 liga, 2 liga+KO, 5 grupos+KO
    substitutions_per_team: 3,
    football_type_id: 1,
    category_id: 1,
    start_date: '2025-09-12',
    end_date: '2025-10-13',
    minMax: JSON.stringify([8, 16]),
  },
  details: {
    prize: 'Copa',
    winner: null,
    description: 'Prueba de creación de torneo',
    status: null,
    locationIds: JSON.stringify([1]), // usa locaciones válidas de tu app
  },
});

describe('Tournaments: creación de torneos', () => {
  let getLastPayload: () => any;

  beforeEach(() => {
    getLastPayload = installTournamentCreateMock();
  });

  it('crea torneo de Liga (id=1)', async () => {
    const res = await $fetch('/api/v1/admin/tournaments', {
      method: 'POST',
      body: buildPayload(1),
    });
    expect(res?.id).toBeTruthy();
    expect(res.tournament_format_id).toBe(1);

    const last = getLastPayload();
    expect(last.basic.tournament_format_id).toBe(1);
    expect(last.basic.name).toContain('Torneo 1');
  });

  it('crea torneo de Liga + Eliminatoria (id=2)', async () => {
    const res = await $fetch('/api/v1/admin/tournaments', {
      method: 'POST',
      body: buildPayload(2),
    });
    expect(res.id).toBeTruthy();
    expect(res.tournament_format_id).toBe(2);

    const last = getLastPayload();
    expect(last.basic.tournament_format_id).toBe(2);
  });

  it('crea torneo de Grupos + Eliminatoria (id=5)', async () => {
    const res = await $fetch('/api/v1/admin/tournaments', {
      method: 'POST',
      body: buildPayload(5),
    }).catch((error) => {
      console.log(error);
    });
    expect(res.id).toBeTruthy();
    expect(res.tournament_format_id).toBe(5);

    const last = getLastPayload();
    expect(last.basic.tournament_format_id).toBe(5);
  });
});
