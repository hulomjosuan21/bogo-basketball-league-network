import {BracketType} from "@/types/leagueTypes";
import {PartialPlayer} from "@/types/playerType";

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

    teamManagerId: string;
    teamId: string;
    leagueIds: {
        leagueId: string;
        isAllowed: boolean;
        bracket: null | BracketType
    }[];
    teamName: string;
    teamMetaData: {
        coach: string;
        assistantCoach: string | null;
        teamCaptain: string;
        teamManager: string;
        contactNumber: string;
        contactEmail: string;
    };
    teamImage: string | null;
    status: TEAM_STATUS[];
    subStatus: TEAM_SUB_STATUS[];
    players: PartialPlayer[];

    gamesWon: number;
    gamesLost: number;
    gamesPlayed: number;
}