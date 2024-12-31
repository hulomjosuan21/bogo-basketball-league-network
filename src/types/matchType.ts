
export enum MatchStatusType {
    SCHEDULE = "Scheduled",
    ONGOING = "Ongoing",
    COMPLETED = "Completed",
    CANCELLED = "Cancelled"
}

export interface Match {
    readonly id: string;
    readonly matchId: string;
    date: Date;
    durationMinutes: number;
    location: string | null;
    leagueId: string;
    bracket: string;
    notes: string;
    status: MatchStatusType;
    statistics: object;
}

export interface MatchTeam {
    readonly id: string;
    readonly matchId: string;
    readonly teamId: string;
    readonly teamName: string;
    score: number;
    status: string;
    subStatus: object[];
    gamesPlayed: number;
    gamesWon: number;
    gamesLost: number;
}