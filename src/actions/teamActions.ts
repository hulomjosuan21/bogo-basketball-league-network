'use server'

import {db} from "@/db/database";
import {InsertTeamsTableType, teamsTable} from "@/db/schemas/teamDataTable";
import {eq} from "drizzle-orm";
import {getCoach} from "@/actions/coachActions";
import AppToolkit from "@/lib/app-toolkit";
import Team, {TEAM_STATUS} from "@/types/teamType";
import {revalidatePath} from "next/cache";
import {createClient} from "@/utils/supabase/server";
import {BracketType} from "@/types/leagueTypes";
import {getTeamManager} from "@/actions/teamManagerActions";

export async function getAllTeamsNoCoachAction() {
    const supabase = await createClient();

    const { data } = await supabase
        .from('teamsTable')
        .select()

    if(!data){
        return { teams: [] as Team[] };
    }

    const teams: Team[] = data;

    return { teams };
}

export async function getAllTeamAction(byCoach = false) {
    try {
        const supabase = await createClient();

        if (byCoach) {
            const { coach } = await getCoach();
            if (coach) {
                const { data: teams, error } = await supabase
                    .from('teamsTable')
                    .select()
                    .eq('coachId', coach.coachId);

                if (error) {
                    throw error;
                }

                return teams as Team[];
            } else {
                return [] as Team[];
            }
        } else {
            const { data: teams, error } = await supabase
                .from('teamsTable')
                .select();

            if (error) {
                throw error;
            }

            return teams as Team[];
        }
    } catch {
        return [] as Team[];
    }
}

export async function insertNewTeamDataAction(formData: FormData){
    const { teamManager } = await getTeamManager()

    if(!teamManager){
        return { errorMessage: 'No team manager found!' }
    }

    const teamName = formData.get('teamName') as string;
    const teamImage = formData.get('teamImage') as string;
    const assistantCoach = formData.get('assistantCoach') as string;
    const teamCaptain = formData.get('assistantCoach') as string;
    const contactNumber = formData.get('assistantCoach') as string;
    const contactEmail = formData.get('assistantCoach');

    const newTeam: InsertTeamsTableType = {
        teamManagerId: teamManager.teamManagerId,
        teamId: AppToolkit.generateUid(teamName),
        teamName,
        teamImage,
        teamMetaData: {assistantCoach,teamCaptain,teamManager: teamManager.fullName,contactNumber,contactEmail},
        status: [TEAM_STATUS.NewEntry],
        playerIds: []
    }

    try {
        await db.insert(teamsTable).values(newTeam);
        revalidatePath('/team-manager/page/team');
        return { errorMessage: null }
    }catch (error){
        return { errorMessage: AppToolkit.getErrorMessage(error) }
    }
}

//para set og bracket type
export async function setBracketForLeagueAction(team: Team, leagueId: string, bracket: BracketType) {
    try {
        if (!Array.isArray(team.leagueIds)) {
            return { errorMessage: `Team does not have any leagues.` };
        }

        const leagueIndex = team.leagueIds.findIndex(league => league.leagueId === leagueId);

        if (leagueIndex === -1) {
            return { errorMessage: `League not found in the team.` };
        }

        team.leagueIds[leagueIndex].bracket = bracket;

        await db.update(teamsTable).set({ leagueIds: team.leagueIds }).where(eq(teamsTable.teamId, team.teamId));
        revalidatePath('/barangayAdmin/page/team');
        return { errorMessage: null };
    } catch (error) {
        return { errorMessage: `Failed to set bracket for league: ${AppToolkit.getErrorMessage(error)}` };
    }
}

export async function addLeagueIdAction(team: Team, leagueId: string) {
    try {
        const leagueMetadata = {
            leagueId,
            isAllowed: false,
            bracket: null
        };

        if (!Array.isArray(team.leagueIds)) {
            team.leagueIds = [];
        } else {
            team.leagueIds = team.leagueIds as { leagueId: string, isAllowed: boolean,bracket: BracketType | null }[];
        }

        if (team.leagueIds.some(league => league.leagueId === leagueId)) {
            return { errorMessage: `Team is already in the league.` };
        }

        team.leagueIds.push(leagueMetadata);
        await db.update(teamsTable).set({ leagueIds: team.leagueIds }).where(eq(teamsTable.teamId, team.teamId));
        revalidatePath('/coach/team');
        return { errorMessage: null };
    } catch (error) {
        return { errorMessage: `Failed to add league to team: ${AppToolkit.getErrorMessage(error)}` };
    }
}

export async function getTeamsByLeagueIdAndIsAllowed(leagueId: string | null, isAllowed: boolean) {
    let isLoading = true;
    console.log(`League id ${leagueId}`)

    if(!leagueId){
        isLoading = false
        return { teams: [] as Team[], isLoading };
    }

    const supabase = await createClient();

    const { data } = await supabase
        .from('teamsTable')
        .select()
        .filter('leagueIds', 'cs', JSON.stringify([
            { leagueId,isAllowed }
        ]));

    if (!data) {
        isLoading = false
        return { teams: [] as Team[],isLoading };
    }

    const teams: Team[] = data;
    isLoading = false;
    return {teams, isLoading};
}

export async function removeLeagueIdAction(team: Team, leagueId: string) {
    try {
        if (!Array.isArray(team.leagueIds)) {
            return { errorMessage: `Team does not have any leagues.` };
        }

        const leagueIndex = team.leagueIds.findIndex(league => league.leagueId === leagueId);

        if (leagueIndex === -1) {
            return { errorMessage: `League not found in the team.` };
        }

        team.leagueIds.splice(leagueIndex, 1);

        await db.update(teamsTable).set({ leagueIds: team.leagueIds }).where(eq(teamsTable.teamId, team.teamId));
        revalidatePath('/coach/team');
        return { errorMessage: null };
    } catch (error) {
        return { errorMessage: `Failed to remove league from team: ${AppToolkit.getErrorMessage(error)}` };
    }
}

export async function updateLeagueTeamIdAction(team: Team, leagueId: string, isAllowed: boolean) {
    try {
        if (!Array.isArray(team.leagueIds)) {
            return { errorMessage: `Team does not have any leagues.` };
        }

        const leagueIndex = team.leagueIds.findIndex(league => league.leagueId === leagueId);

        if (leagueIndex === -1) {
            return { errorMessage: `League not found in the team.` };
        }

        team.leagueIds[leagueIndex].isAllowed = isAllowed;

        await db.update(teamsTable).set({ leagueIds: team.leagueIds }).where(eq(teamsTable.teamId, team.teamId));
        revalidatePath('/coach/team');
        return { errorMessage: null };
    } catch (error) {
        return { errorMessage: `Failed to update league in team: ${AppToolkit.getErrorMessage(error)}` };
    }
}

export async function addPlayerAction(team: Team, playerId: string) {
    try {
        if (!Array.isArray(team.playerIds)) {
            team.playerIds = [];
        } else {
            team.playerIds = team.playerIds as string[];
        }

        if (team.playerIds.includes(playerId)) {
            return { errorMessage: `Player is already in the team.` };
        }

        team.playerIds.push(playerId);
        await db.update(teamsTable).set({ playerIds: team.playerIds }).where(eq(teamsTable.teamId, team.teamId));
        revalidatePath('/coach/team');
        return { errorMessage: null };
    } catch (error) {
        return { errorMessage: `Failed to add player to team: ${AppToolkit.getErrorMessage(error)}` };
    }
}

export async function removePlayerAction(team: Team, playerId: string) {
    try {
        if (!Array.isArray(team.playerIds)) {
            return { errorMessage: `Team does not have any players.` };
        }

        team.playerIds = team.playerIds as string[];

        if (!team.playerIds.includes(playerId)) {
            return { errorMessage: `Player is not in the team.` };
        }

        team.playerIds = team.playerIds.filter(id => id !== playerId);
        await db.update(teamsTable).set({ playerIds: team.playerIds }).where(eq(teamsTable.teamId, team.teamId));
        revalidatePath('/coach/team');
        return { errorMessage: null };
    } catch (error) {
        return { errorMessage: `Failed to remove player from team: ${AppToolkit.getErrorMessage(error)}` };
    }
}

export async function updateTeamAction(teamId: string, value: object){
    try{
        await db.update(teamsTable).set(value).where(eq(teamsTable.teamId, teamId));
        return { errorMessage: null };
    }catch (error){
        return { errorMessage: `Failed to update team: ${AppToolkit.getErrorMessage(error)}` };
    }
}

export async function deleteTeamById(teamId: string) {
    try {
        await db.delete(teamsTable).where(eq(teamsTable.teamId, teamId));
        revalidatePath('/coach/team');
        return { errorMessage: null };
    } catch (error) {
        return { errorMessage: `Failed to delete team: ${AppToolkit.getErrorMessage(error)}` };
    }
}