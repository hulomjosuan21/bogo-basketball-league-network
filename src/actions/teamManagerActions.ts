import {createClient, getUser} from "@/utils/supabase/server";
import TeamManagerType from "@/types/managerType";

export async function getTeamManager(){
    const [{ user }, supabase] = await Promise.all([getUser(), createClient()]);
    if (!user) {
       throw new Error('User not found');
    }

    const { data } = await supabase.from('teamsTable').select().eq('userId', user.id).single();

    if(!data){
        throw new Error('Team Manager not found');
    }

    const teamManager: TeamManagerType = data

    return { user, teamManager }
}