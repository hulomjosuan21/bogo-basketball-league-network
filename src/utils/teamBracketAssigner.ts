import Team, {TEAM_STATUS, TEAM_SUB_STATUS} from "@/types/teamType";
import {BracketType} from "@/types/leagueTypes";
import {setBracketForLeagueAction} from "@/actions/teamActions";

export class TeamBracketAssigner {
    private teams: Team[];
    private leagueId: string;

    constructor(teams: Team[], leagueId: string) {
        this.teams = teams;
        this.leagueId = leagueId;
        if(teams.length < 4){
            throw new Error('There should be at least 4 teams to assign brackets');
        }
    }

    async assignBrackets() {
        const higherBracketTeams: Team[] = [];
        const lowerBracketTeams: Team[] = [];
        const crossedBracketTeams: Team[] = [];
        const newEntryTeams: Team[] = [];

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

        for (let i = 0; i < newEntryTeams.length; i++) {
            if (i % 2 === 0) {
                higherBracketTeams.push(newEntryTeams[i]);
            } else {
                lowerBracketTeams.push(newEntryTeams[i]);
            }
        }

        await this.assignBracketToTeams(higherBracketTeams, BracketType.HIGHER);
        await this.assignBracketToTeams(lowerBracketTeams, BracketType.LOWER);
        await this.assignBracketToTeams(crossedBracketTeams, BracketType.CROSSED);
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
