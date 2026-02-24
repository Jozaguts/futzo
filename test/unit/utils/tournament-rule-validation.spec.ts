import { describe, expect, it } from 'vitest';
import {
  calculateAgeInYears,
  extractQuantityRulesIssues,
  parseTournamentRulesCollection,
  validateAgeRulesForPlayer,
} from '../../../app/utils/tournament-rule-validation';
import type { TournamentRule } from '../../../app/models/settings';

const baseRules: TournamentRule[] = [
  {
    id: 10,
    tournament_id: 5,
    rule_template_id: 1,
    name: 'Foraneos',
    type: 'cantidad',
    condition: null,
    age: null,
    max_players: 3,
  },
  {
    id: 11,
    tournament_id: 5,
    rule_template_id: 4,
    name: 'Sub23',
    type: 'edad',
    condition: 'menores de',
    age: 23,
    max_players: 5,
  },
];

describe('tournament rule validation utils', () => {
  it('calculates age in years', () => {
    const age = calculateAgeInYears('2000-02-24', new Date('2026-02-24T12:00:00Z'));
    expect(age).toBe(26);
  });

  it('parses tournament rules from array or wrapped payload', () => {
    expect(parseTournamentRulesCollection(baseRules)).toHaveLength(2);
    expect(parseTournamentRulesCollection({ data: baseRules })).toHaveLength(2);
    expect(parseTournamentRulesCollection({ rules: baseRules })).toHaveLength(2);
    expect(parseTournamentRulesCollection({})).toEqual([]);
  });

  it('returns age issue when rule is not satisfied', () => {
    const issues = validateAgeRulesForPlayer(baseRules, '1990-01-01');
    expect(issues).toHaveLength(1);
    expect(issues[0]).toContain('Sub23');
  });

  it('returns no age issues when rule is satisfied', () => {
    const issues = validateAgeRulesForPlayer(baseRules, '2010-01-01');
    expect(issues).toEqual([]);
  });

  it('detects quantity issues from compliance summary flags', () => {
    const issues = extractQuantityRulesIssues(
      {
        can_add_player: false,
        message: 'No hay cupo disponible',
      },
      baseRules
    );
    expect(issues).toEqual(['No hay cupo disponible']);
  });

  it('detects quantity issues from count limits', () => {
    const issues = extractQuantityRulesIssues(
      {
        rules: [
          {
            name: 'Foraneos',
            type: 'cantidad',
            current_players: 3,
            max_players: 3,
          },
        ],
      },
      baseRules
    );
    expect(issues).toHaveLength(1);
    expect(issues[0]).toContain('Foraneos');
  });
});
