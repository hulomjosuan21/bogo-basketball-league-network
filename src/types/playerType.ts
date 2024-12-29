
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
    nickname: string;
    playerId: string;
    jerseyNumber: number;
    playerHeight: number;
    playerWeight: number;
    primaryPosition: string;
    secondaryPosition: string;

    leagueMetadata: PlayerLeagueMetaData[];

    teamMetaData: PlayerTeamMetaData[];

    gamesPlayed: number;

    readonly createdAt: Date;
    readonly updatedAt: Date;
}