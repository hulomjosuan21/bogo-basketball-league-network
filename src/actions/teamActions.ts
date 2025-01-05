'use server'

import {db} from "@/db/database";
import {InsertTeamsTableType, teamsTable} from "@/db/schemas/teamDataTable";
import {eq} from "drizzle-orm";
import AppToolkit from "@/lib/app-toolkit";
import Team, {TEAM_STATUS} from "@/types/teamType";
import {revalidatePath} from "next/cache";
import {createClient} from "@/utils/supabase/server";
import {BracketType} from "@/types/leagueTypes";
import {getTeamManager} from "@/actions/teamManagerActions";
import {PartialPlayer} from "@/types/playerType";
import {sendSmsAction} from "@/actions/sendSmsActions";

export async function getAllTeamByTeamManager(){
    const [ {teamManager}, supabase] = await Promise.all([
        getTeamManager(),
        createClient()
    ])

    if(!teamManager){
        throw new Error('No team manager found!')
    }

    const { data } = await supabase
        .from('teamsTable')
        .select()
        .eq('teamManagerId', teamManager.teamManagerId)

    if(!data){
        return { teams: [] as Team[] };
    }

    const teams: Team[] = data;

    return { teams };
}

export async function getAllTeamsAction() {
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

export async function insertNewTeamDataAction(formData: FormData,addedPlayers: PartialPlayer[]){
    const { teamManager } = await getTeamManager()

    if(!teamManager){
        return { errorMessage: 'No team manager found!' }
    }

    const teamName = formData.get('teamName') as string;
    const teamImage = formData.get('teamImage') as string;
    const coach = formData.get('coach') as string;
    const assistantCoach = formData.get('assistantCoach');
    const teamCaptain = formData.get('teamCaptain') as string;
    const contactNumber = formData.get('contactNumber') as string;
    const contactEmail = formData.get('contactEmail');

    console.log(`Team name ${teamName}`)
    console.log(`Team image ${teamImage}`)
    console.log(`Assistant coach ${assistantCoach}`)
    console.log(`Team captain ${teamCaptain}`)
    console.log(`Contact number ${contactNumber}`)
    console.log(`Contact email ${contactEmail}`)
    console.log(`Added players ${JSON.stringify(addedPlayers,null,2)}`)


    const newTeam: InsertTeamsTableType = {
        teamManagerId: teamManager.teamManagerId,
        teamId: AppToolkit.generateUid(teamName),
        teamName,
        teamImage,
        teamMetaData: {coach,assistantCoach,teamCaptain,teamManager: teamManager.fullName,contactNumber,contactEmail},
        status: [TEAM_STATUS.NewEntry],
        players: addedPlayers
    }

    try {
        await db.insert(teamsTable).values(newTeam);
        revalidatePath('/team-manager/page/team');
        return { errorMessage: null }
    }catch (error){
        return { errorMessage: AppToolkit.getErrorMessage(error) }
    }
}

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

        if(isAllowed) {
            await sendSmsAction(AppToolkit.fixPhoneNumber(team.teamMetaData.contactNumber),`Team ${team.teamName} approved to participate to league`)
        }

        const leagueIndex = team.leagueIds.findIndex(league => league.leagueId === leagueId);

        if (leagueIndex === -1) {
            return { errorMessage: `League not found in the team.` };
        }

        team.leagueIds[leagueIndex].isAllowed = isAllowed;

        await db.update(teamsTable).set({ leagueIds: team.leagueIds }).where(eq(teamsTable.teamId, team.teamId));
        revalidatePath('/coach/team');
        revalidatePath('/barangayAdmin/page/team')
        return { errorMessage: null };
    } catch (error) {
        return { errorMessage: `Failed to update league in team: ${AppToolkit.getErrorMessage(error)}` };
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