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
    readonly id: string;
    readonly createdAt: string;
    readonly updatedAt: string;

    coachId: string;
    teamId: string;
    league: unknown;
    teamName: string;
    teamMetaData: unknown;
    teamImage: string | null;
    status: unknown;
    subStatus: unknown;
    playerIds: string[];

    gamesWon: number;
    gamesLost: number;
    gamesPlayed: number;
}