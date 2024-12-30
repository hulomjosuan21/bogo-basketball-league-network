
export enum PLAYER_POSITION {
    Point_Guard = "Point Guard",
    Shooting_Guard = "Shooting Guard",
    Small_Forward = "Small Forward",
    Power_Forward = "Power Forward",
    Center = "Center",
}

export interface PlayerTeamMetaData {
    teamId: string;
    coachId: string;
    isJoined: boolean;
}

export interface PlayerLeagueMetaData {
    leagueId?: string;
    requirements?: {
        validIdImageUrl?: string;
        medicalImageUrl?: string;
    };
    isAllowed: boolean;
}

export interface Player {
    readonly id: string;
    readonly userId: string;
    readonly playerId: string;
    fullName: string;
    leagueMetadata: unknown;
    teamMetaData: unknown;
    nickname: string;
    readonly gender: string;
    jerseyNumber: number;
    playerHeight: string | null;
    playerWeight: string | null;
    primaryPosition: string;
    secondaryPosition: string | null;
    gamesPlayed: number;
    createdAt: string;
    updatedAt: string
}