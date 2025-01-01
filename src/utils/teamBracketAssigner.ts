import Team, {TEAM_STATUS, TEAM_SUB_STATUS} from "@/types/teamType";
import {BracketType} from "@/types/leagueTypes";
import {setBracketForLeagueAction} from "@/actions/teamActions";

export class TeamBracketAssigner {
    private teams: Team[];
    private leagueId: string;

    constructor(teams: Team[], leagueId: string) {
        this.teams = teams;
        this.leagueId = leagueId;
    }

    async assignBrackets() {
        const higherBracketTeams: Team[] = [];
        const lowerBracketTeams: Team[] = [];
        const crossedBracketTeams: Team[] = [];
        const newEntryTeams: Team[] = [];

        // Sort teams into categories based on status, subStatus, and performance
        for (const team of this.teams) {
            if (team.status.includes(TEAM_STATUS.NewEntry)) {
                newEntryTeams.push(team);
            } else if (team.subStatus.includes(TEAM_SUB_STATUS.Champion) || team.subStatus.includes(TEAM_SUB_STATUS.DefendingChampion)) {
                higherBracketTeams.push(team);
            } else if (team.subStatus.includes(TEAM_SUB_STATUS.OnProbation) || team.subStatus.includes(TEAM_SUB_STATUS.Relegated)) {
                lowerBracketTeams.push(team);
            } else if (team.subStatus.includes(TEAM_SUB_STATUS.Promoted)) {
                crossedBracketTeams.push(team);
            } else {
                higherBracketTeams.push(team);
            }
        }

        // Distribute New Entry teams evenly between higher and lower brackets
        for (let i = 0; i < newEntryTeams.length; i++) {
            if (i % 2 === 0) {
                higherBracketTeams.push(newEntryTeams[i]);
            } else {
                lowerBracketTeams.push(newEntryTeams[i]);
            }
        }

        // Sort teams within brackets based on performance metrics
        higherBracketTeams.sort((a, b) => this.compareTeamsByPerformance(a, b));
        lowerBracketTeams.sort((a, b) => this.compareTeamsByPerformance(a, b));
        crossedBracketTeams.sort((a, b) => this.compareTeamsByPerformance(a, b));

        // Assign brackets
        await this.assignBracketToTeams(higherBracketTeams, BracketType.HIGHER);
        await this.assignBracketToTeams(lowerBracketTeams, BracketType.LOWER);
        await this.assignBracketToTeams(crossedBracketTeams, BracketType.CROSSED);
    }

    private compareTeamsByPerformance(teamA: Team, teamB: Team): number {
        const winRateA = teamA.gamesPlayed > 0 ? teamA.gamesWon / teamA.gamesPlayed : 0;
        const winRateB = teamB.gamesPlayed > 0 ? teamB.gamesWon / teamB.gamesPlayed : 0;

        // Sort by win rate, then by games won, then by games played
        if (winRateA !== winRateB) {
            return winRateB - winRateA;
        }
        if (teamA.gamesWon !== teamB.gamesWon) {
            return teamB.gamesWon - teamA.gamesWon;
        }
        return teamB.gamesPlayed - teamA.gamesPlayed;
    }

    private async assignBracketToTeams(teams: Team[], bracket: BracketType) {
        try {
            for (const team of teams) {
                const {errorMessage} = await setBracketForLeagueAction(team, this.leagueId, bracket);

                if (errorMessage) {
                    throw new Error(errorMessage);
                }
            }
        } catch (error) {
            console.error('An error occurred while assigning brackets:', error);
            throw error;
        }
    }
}

