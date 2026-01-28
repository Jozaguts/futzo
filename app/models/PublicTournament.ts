export type PublicTournamentHeader = {
  name: string;
  phase: string;
  startDate: string;
  location: string;
  teams: number;
  status: string;
  format: string;
};

import type { LastGames, NextGames, Team as GameTeam } from '~/models/Game';
import type { PlayerStats } from '~/models/tournament';

export type PublicStandingRow = {
  rank: number;
  name: string;
  team: Pick<GameTeam, 'id' | 'name' | 'image'>;
  matches_played: number;
  wins: number;
  draws: number;
  losses: number;
  goals_for: number;
  goals_against: number;
  goal_difference: number;
  points: number;
  last_5: string;
};

export type PublicGroupStanding = {
  groups: Array<{ group: string | number; standings: PublicStandingRow[] }>;
};

export type PublicStats = {
  goals: PlayerStats[];
  assistance: PlayerStats[];
  yellow_cards: PlayerStats[];
  red_cards: PlayerStats[];
};

export type PublicScheduleMatch = {
  id: number;
  homeTeam: string;
  homeShort: string;
  homeScore: number | null;
  awayTeam: string;
  awayShort: string;
  awayScore: number | null;
  time: string;
  venue: string;
  played: boolean;
};

export type PublicScheduleRound = {
  round: number;
  date: string;
  matches: PublicScheduleMatch[];
};

export type PublicTournamentStatusData = {
  header: PublicTournamentHeader;
  standings: PublicStandingRow[];
  groupStanding: PublicGroupStanding;
  upcomingMatches: NextGames;
  lastResults: LastGames[];
  stats: PublicStats;
  schedule: PublicScheduleRound[];
};
