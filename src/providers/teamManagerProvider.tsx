import { getTeamManager, insertNewTeamManagerDataAction } from "@/actions/teamManagerActions";
import { getUser } from "@/utils/supabase/server";
import { ReactNode } from "react";

export default async function TeamManagerProvider({children}:{children:ReactNode}){
    const { teamManager } = await getTeamManager();
    const { user, userData} = await getUser();

    if(!user) {
        throw new Error('User not found');
    }

    if(!userData){
        throw new Error('User data not found');
    }

    if(!teamManager){
        await insertNewTeamManagerDataAction(userData.firstName,userData.lastName,user.id);
    }
    
    return (
        <>
         {children}
        </>
    )
}