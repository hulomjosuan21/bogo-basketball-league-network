export enum TEAM_STATUS {
    Active = 'Active',
    Inactive = 'Inactive',
    Registered = 'Registered',
    PendingApproval = 'Pending Approval',
    Disqualified = 'Disqualified',
    Suspended = 'Suspended',
    Eliminated = 'Eliminated',
    Withdrawn = 'Withdrawn',
    NewEntry = 'New Entry',
}

export enum TEAM_SUB_STATUS {
    Champion = 'Champion',
    OnProbation = 'On Probation',
    Relegated = 'Relegated',
    Promoted = 'Promoted',
    DefendingChampion = 'Defending Champion'
}

export default interface Team {
    readonly _id: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;

    coachId: string;
    teamId: string;
    league: { leagueId: string; allowed: boolean };
    teamName: string;
    assistantCoach?: string;
    teamImageUrl: string | null;
    status: string[];
    subStatus: string[];
    playerIds: string[],

    gamesWon: number;
    gamesLost: number;
    gamesPlayed: number;
}