import {BracketType} from "@/types/leagueTypes";
import Team from "@/types/teamType";

export interface ToMatchTeam {
    id: string;
    teamId: string,
    teamName: string,
    bracket: BracketType,
    teamImage: string | null
}

export interface MatchUp {
    homeTeam: ToMatchTeam | null
    awayTeam: ToMatchTeam | null
}

export function findTeamsByLeagueId(
    teams: Team[],
    currentActiveLeagueId: string
): ToMatchTeam[] {
    return teams
        .filter((team) =>
            team.leagueIds.some(
                (league) =>
                    league.leagueId === currentActiveLeagueId && league.isAllowed
            )
        )
        .map((team) => {
            const leagueInfo = team.leagueIds.find(
                (league) => league.leagueId === currentActiveLeagueId
            );

            return {
                id: team.id,
                teamId: team.teamId,
                teamName: team.teamName,
                bracket: leagueInfo?.bracket as BracketType,
                teamImage: team.teamImage
            };
        });
}