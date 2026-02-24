import type { TournamentRule, TournamentRuleCondition, TournamentRuleType } from '~/models/settings';

type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord => {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
};

const toNumberOrNull = (value: unknown): number | null => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const toBooleanOrNull = (value: unknown): boolean | null => {
  if (typeof value === 'boolean') return value;
  return null;
};

const pickNumber = (source: UnknownRecord, keys: string[]): number | null => {
  for (const key of keys) {
    const value = toNumberOrNull(source[key]);
    if (value !== null) return value;
  }
  return null;
};

const pickBoolean = (source: UnknownRecord, keys: string[]): boolean | null => {
  for (const key of keys) {
    const value = toBooleanOrNull(source[key]);
    if (value !== null) return value;
  }
  return null;
};

const pickString = (source: UnknownRecord, keys: string[]): string | null => {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === 'string' && value.trim().length > 0) {
      return value.trim();
    }
  }
  return null;
};

const normalizeRuleName = (value: string | null | undefined) => {
  return (value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
};

export const normalizeTournamentRuleType = (value: unknown): TournamentRuleType | null => {
  const normalized = String(value ?? '')
    .trim()
    .toLowerCase();

  if (normalized === 'edad' || normalized === 'age') return 'edad';
  if (normalized === 'cantidad' || normalized === 'boolean') return 'cantidad';
  return null;
};

export const normalizeTournamentRuleCondition = (value: unknown): TournamentRuleCondition | null => {
  const normalized = String(value ?? '')
    .trim()
    .toLowerCase();

  if (normalized === 'menores de' || normalized === 'sub') return 'menores de';
  if (normalized === 'mayores de' || normalized === 'mayor') return 'mayores de';
  return null;
};

export const parseTournamentRulesCollection = (value: unknown): TournamentRule[] => {
  if (Array.isArray(value)) return value as TournamentRule[];
  if (!isRecord(value)) return [];
  if (Array.isArray(value.data)) return value.data as TournamentRule[];
  if (Array.isArray(value.rules)) return value.rules as TournamentRule[];
  return [];
};

export const calculateAgeInYears = (birthdate: string | Date | null | undefined, now: Date = new Date()) => {
  if (!birthdate) return null;

  const parsedBirthdate = birthdate instanceof Date ? birthdate : new Date(birthdate);
  if (Number.isNaN(parsedBirthdate.getTime())) return null;

  let age = now.getFullYear() - parsedBirthdate.getFullYear();
  const monthDiff = now.getMonth() - parsedBirthdate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < parsedBirthdate.getDate())) {
    age -= 1;
  }

  return age;
};

const buildAgeRuleMessage = (rule: TournamentRule) => {
  const condition = normalizeTournamentRuleCondition(rule.condition);
  const age = toNumberOrNull(rule.age);
  const name = rule.name?.trim() || 'Regla de edad';

  if (!condition || age === null) {
    return `No se pudo validar la regla de edad "${name}".`;
  }

  return `No cumple la regla "${name}": debe ser ${condition} ${age} anios.`;
};

export const validateAgeRulesForPlayer = (rules: TournamentRule[], birthdate: string | Date | null | undefined) => {
  const ageRules = rules.filter((rule) => normalizeTournamentRuleType(rule.type) === 'edad');
  if (ageRules.length === 0) return [] as string[];

  const playerAge = calculateAgeInYears(birthdate);
  if (playerAge === null) {
    return ['No se pudo validar la edad del jugador para las reglas del torneo.'];
  }

  const issues: string[] = [];

  for (const rule of ageRules) {
    const condition = normalizeTournamentRuleCondition(rule.condition);
    const limitAge = toNumberOrNull(rule.age);
    if (!condition || limitAge === null) continue;

    const isValid = condition === 'menores de' ? playerAge < limitAge : playerAge > limitAge;
    if (!isValid) {
      issues.push(buildAgeRuleMessage(rule));
    }
  }

  return issues;
};

const parseComplianceEntries = (value: unknown): UnknownRecord[] => {
  if (Array.isArray(value)) {
    return value.filter(isRecord);
  }

  if (!isRecord(value)) {
    return [];
  }

  if (Array.isArray(value.rules)) {
    return value.rules.filter(isRecord);
  }

  if (Array.isArray(value.data)) {
    return value.data.filter(isRecord);
  }

  if (Array.isArray(value.items)) {
    return value.items.filter(isRecord);
  }

  return [];
};

const resolveEntryName = (entry: UnknownRecord) => {
  return pickString(entry, ['name', 'rule_name']);
};

const resolveEntryType = (entry: UnknownRecord): TournamentRuleType | null => {
  const directType = normalizeTournamentRuleType(entry.type);
  if (directType) return directType;

  const template = isRecord(entry.rule_template) ? entry.rule_template : null;
  if (template) return normalizeTournamentRuleType(template.type);

  return null;
};

const resolveEntryMessage = (entry: UnknownRecord) => {
  return pickString(entry, ['message', 'reason', 'description']);
};

export const extractQuantityRulesIssues = (summary: unknown, rules: TournamentRule[]) => {
  const quantityRules = rules.filter((rule) => normalizeTournamentRuleType(rule.type) === 'cantidad');
  if (quantityRules.length === 0) return [] as string[];

  const messages = new Set<string>();
  const root = isRecord(summary) ? summary : null;

  if (root) {
    const rootCanAddPlayer = pickBoolean(root, ['can_add_player', 'can_register_player']);
    if (rootCanAddPlayer === false) {
      const rootMessage = pickString(root, ['message', 'reason', 'description']);
      messages.add(rootMessage ?? 'Se alcanzo el maximo permitido de jugadores por regla del torneo.');
    }
  }

  const rulesByName = new Map(quantityRules.map((rule) => [normalizeRuleName(rule.name), rule]));
  const entries = parseComplianceEntries(summary);

  for (const entry of entries) {
    const entryType = resolveEntryType(entry);
    const hasQuotaSignals =
      pickNumber(entry, ['max_players', 'limit', 'max']) !== null ||
      pickNumber(entry, ['current_players', 'players_count', 'count', 'current']) !== null ||
      pickBoolean(entry, ['can_add_player', 'can_register_player', 'is_compliant', 'compliant']) !== null;

    if (entryType !== 'cantidad' && !hasQuotaSignals) {
      continue;
    }

    const entryName = resolveEntryName(entry);
    const matchedRule = rulesByName.get(normalizeRuleName(entryName));
    const ruleLabel = entryName ?? matchedRule?.name ?? 'Regla de cantidad';

    const canAddPlayer = pickBoolean(entry, ['can_add_player', 'can_register_player']);
    const isCompliant = pickBoolean(entry, ['is_compliant', 'compliant', 'valid']);
    const maxPlayers = pickNumber(entry, ['max_players', 'limit', 'max']);
    const currentPlayers = pickNumber(entry, ['current_players', 'players_count', 'count', 'current']);

    const limitReached = maxPlayers !== null && currentPlayers !== null && currentPlayers >= maxPlayers;
    const failedByFlags = canAddPlayer === false || isCompliant === false;

    if (!limitReached && !failedByFlags) {
      continue;
    }

    const entryMessage = resolveEntryMessage(entry);
    if (entryMessage) {
      messages.add(entryMessage);
      continue;
    }

    if (maxPlayers !== null && currentPlayers !== null) {
      messages.add(`La regla "${ruleLabel}" alcanzo el limite (${currentPlayers}/${maxPlayers}).`);
      continue;
    }

    messages.add(`La regla "${ruleLabel}" no permite registrar mas jugadores.`);
  }

  return Array.from(messages);
};
