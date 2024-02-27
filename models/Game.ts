export interface Game {
    id?: number | null;
    away: {name: string, img: string} | null;
    home : {name: string, img: string} | null;
    result?: string | null;
    schedule: {day: string, hour: string};
    league_id?: number| null;
    status?: string | null;
    league?: string | null;
}