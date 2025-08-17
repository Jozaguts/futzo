export interface League {
    id?: number | null
    name: string;
    description?: string | null;
    creation_date?: string | null;
    logo?: string | null;
    banner?: string | null;
    status?: string | null;
    teams_count?: number | null;
}
export interface LeagueType {
    id: number;
    name: string;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;
}