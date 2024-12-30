'use server'

import {db} from "@/db/database";
import {InsertTeamsTableType, teamsTable} from "@/db/schemas/teamDataTable";
import {eq} from "drizzle-orm";
import {getCoach} from "@/actions/coachActions";
import AppToolkit from "@/lib/app-toolkit";
import Team, {TEAM_STATUS} from "@/types/teamType";
import {revalidatePath} from "next/cache";
import {createClient} from "@/utils/supabase/server";

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
    const { coach } = await getCoach();

    if(!coach){
        return { errorMessage: 'No coach found!' }
    }

    const teamName = formData.get('teamName') as string;
    const teamImage = formData.get('teamImage') as string;
    const assistantCoach = formData.get('assistantCoach') as string;

    const newTeam: InsertTeamsTableType = {
        coachId: coach.coachId,
        teamId: AppToolkit.generateUid(teamName),
        teamName,
        teamImage,
        teamMetaData: {assistantCoach},
        status: [TEAM_STATUS.NewEntry],
    }

    try {
        console.log(`New team created ${JSON.stringify(newTeam,null,2)}`);
        await db.insert(teamsTable).values(newTeam);
        revalidatePath('/coach/team');
        return { errorMessage: null }
    }catch (error){
        return { errorMessage: AppToolkit.getErrorMessage(error) }
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