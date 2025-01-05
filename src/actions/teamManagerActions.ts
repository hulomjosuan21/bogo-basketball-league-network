'use server'
import {createClient, getUser} from "@/utils/supabase/server";
import TeamManagerType from "@/types/managerType";
import AppToolkit from "@/lib/app-toolkit";
import { db } from "@/db/database";
import { InsertTeamManagerType, teamManagerTable } from "@/db/schemas/teamManagerDataTable";

export async function getTeamManager(){
    const [{ user }, supabase] = await Promise.all([getUser(), createClient()]);

    if (!user) {
       throw new Error('User not found');
    }

    const { data } = await supabase.from('teamManagerTable').select().eq('userId', user.id).single();

    if(!data){
        return { user, teamManager: null }
    }

    const teamManager: TeamManagerType = data

    return { user, teamManager }
}

export async function insertNewTeamManagerDataAction(firstName: string,lastName: string,userId: string){
    try {
        const newTeamManager: InsertTeamManagerType = {
            fullName: `${firstName} ${lastName}`,
            userId: userId,
            teamManagerId: AppToolkit.generateUid(firstName),
        }
        await db.insert(teamManagerTable).values(newTeamManager);
        return { errorMessage: null }
    }catch(error){
        return { errorMessage: AppToolkit.getErrorMessage(error) }
    }
}