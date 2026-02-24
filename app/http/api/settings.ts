import {useRequestFetch, useRuntimeConfig, useSanctumClient} from '#imports';
import type {
  DisciplineSettingsDefaults,
  DisciplineSettingsDefaultsPayload,
  DisciplineTemplatePayload,
  DisciplineTemplateSetting,
  DisciplineViolationPayload,
  DisciplineViolationSetting,
  PlayerTransferLockSetting,
  PlayerVerificationMethod,
  PlayerVerificationSettings,
  TournamentConfigurationSettings,
  TournamentRule,
  TournamentRulePayload,
  TournamentRuleTemplate,
} from '~/models/settings';

export const getPlayerTransferLocks = async () => {
  const client = useSanctumClient();
  return await client<PlayerTransferLockSetting[]>('/api/v1/admin/settings/players/transfer-locks');
};

export const updatePlayerTransferLock = async (tournamentId: number, player_lock_duration_days: number) => {
  const client = useSanctumClient();
  return await client<{ id: number; player_lock_duration_days: number }>(
    `/api/v1/admin/settings/players/transfer-locks/${tournamentId}`,
    {
      method: 'PUT',
      body: { player_lock_duration_days },
    }
  );
};

export const getPlayerVerificationSettings = async () => {
  const client = useSanctumClient();
  return await client<PlayerVerificationSettings>('/api/v1/admin/settings/players/verification');
};

export const getPlayerVerificationSettingsPublic = async (teamSlug: string) => {
  const config = useRuntimeConfig();
  const requestFetch = useRequestFetch();
  const encodedSlug = encodeURIComponent(teamSlug);
  return await requestFetch<PlayerVerificationSettings>(
    `${config.public.baseURLBackend}/api/v1/public/settings/players/verification?team_slug=${encodedSlug}`,
    {
      headers: {
        accept: 'application/json',
      },
    }
  );
};

export const updatePlayerVerificationSettings = async (payload: PlayerVerificationSettings) => {
  const client = useSanctumClient();
  return await client<PlayerVerificationSettings>('/api/v1/admin/settings/players/verification', {
    method: 'PUT',
    body: payload,
  });
};

export const updateTournamentVerificationSettings = async (
  tournamentId: number,
  payload: {
    requires_player_verification: boolean | null;
    player_verification_method: PlayerVerificationMethod | null;
  }
) => {
  const client = useSanctumClient();
  return await client<{
    id: number;
    requires_player_verification: boolean | null;
    player_verification_method: PlayerVerificationMethod | null;
  }>(`/api/v1/admin/settings/tournaments/${tournamentId}/verification`, {
    method: 'PUT',
    body: payload,
  });
};

export const getTournamentConfiguration = async (tournamentId: number) => {
  const client = useSanctumClient();
  return await client<TournamentConfigurationSettings>(
    `/api/v1/admin/settings/tournaments/${tournamentId}/configuration`
  );
};

export const updateTournamentConfiguration = async (
  tournamentId: number,
  payload: TournamentConfigurationSettings
) => {
  const client = useSanctumClient();
  return await client<TournamentConfigurationSettings>(
    `/api/v1/admin/settings/tournaments/${tournamentId}/configuration`,
    {
      method: 'PUT',
      body: payload,
    }
  );
};

export const getTournamentRuleTemplates = async () => {
  const client = useSanctumClient();
  return await client<TournamentRuleTemplate[]>('/api/v1/admin/tournaments/rule-templates');
};

export const getTournamentRules = async (tournamentId: number) => {
  const client = useSanctumClient();
  return await client<TournamentRule[]>(`/api/v1/admin/tournaments/${tournamentId}/rules`);
};

export const syncTournamentRules = async (tournamentId: number, payload: { rules: TournamentRulePayload[] }) => {
  const client = useSanctumClient();
  return await client<TournamentRule[]>(`/api/v1/admin/tournaments/${tournamentId}/rules`, {
    method: 'POST',
    body: payload,
  });
};

export const getTournamentTeamRulesComplianceSummary = async (tournamentId: number, teamId: number) => {
  const client = useSanctumClient();
  return await client<unknown>(`/api/v1/admin/tournaments/${tournamentId}/teams/${teamId}/rules/compliance-summary`);
};

export const getDisciplineViolations = async () => {
  const client = useSanctumClient();
  return await client<DisciplineViolationSetting[] | { data?: DisciplineViolationSetting[] }>(
    '/api/v1/admin/settings/discipline/violations'
  );
};

export const createDisciplineViolation = async (payload: DisciplineViolationPayload) => {
  const client = useSanctumClient();
  return await client<DisciplineViolationSetting>('/api/v1/admin/settings/discipline/violations', {
    method: 'POST',
    body: payload,
  });
};

export const updateDisciplineViolation = async (violationId: number, payload: DisciplineViolationPayload) => {
  const client = useSanctumClient();
  return await client<DisciplineViolationSetting>(`/api/v1/admin/settings/discipline/violations/${violationId}`, {
    method: 'PATCH',
    body: payload,
  });
};

export const getDisciplineTemplates = async () => {
  const client = useSanctumClient();
  return await client<DisciplineTemplateSetting[] | { data?: DisciplineTemplateSetting[] }>(
    '/api/v1/admin/settings/discipline/templates'
  );
};

export const createDisciplineTemplate = async (payload: DisciplineTemplatePayload) => {
  const client = useSanctumClient();
  return await client<DisciplineTemplateSetting>('/api/v1/admin/settings/discipline/templates', {
    method: 'POST',
    body: payload,
  });
};

export const updateDisciplineTemplate = async (templateId: number, payload: DisciplineTemplatePayload) => {
  const client = useSanctumClient();
  return await client<DisciplineTemplateSetting>(`/api/v1/admin/settings/discipline/templates/${templateId}`, {
    method: 'PATCH',
    body: payload,
  });
};

export const getDisciplineSettingsDefaults = async () => {
  const client = useSanctumClient();
  return await client<DisciplineSettingsDefaults>('/api/v1/admin/settings/discipline/defaults');
};

export const updateDisciplineSettingsDefaults = async (payload: DisciplineSettingsDefaultsPayload) => {
  const client = useSanctumClient();
  return await client<DisciplineSettingsDefaults>('/api/v1/admin/settings/discipline/defaults', {
    method: 'PUT',
    body: payload,
  });
};
