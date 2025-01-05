
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
    leagueId: string;
    requirements: {
        residency: string;
        identityFile: string;
    };
    isAllowed: boolean;
}

export interface PartialPlayer {
    fullName: string;
    playerId: string;
    jerseyNumber: number;
}

export interface Player {
    readonly id: string;
    readonly userId: string;
    readonly playerId: string;
    email: string,
    phoneNumber: string,
    fullName: string;
    leagueMetadata: PlayerLeagueMetaData | null;
    teamMetaData: PlayerTeamMetaData[];
    playerImage: string | null;
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