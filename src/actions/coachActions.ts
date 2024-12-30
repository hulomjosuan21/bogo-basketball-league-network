'use server'
import {createClient, getUser} from "@/utils/supabase/server";
import Coach from "@/types/coachType";
import {InsertCoachType} from "@/db/schemas/coachDataTable";
import AppToolkit from "@/lib/app-toolkit";

export const getCoach = async () => {
    const [{ user }, supabase] = await Promise.all([getUser(), createClient()]);

    const { data: coachData } = await supabase
        .from('coachesTable')
        .select()
        .eq('userId', user?.id)
        .single();

    if (!coachData) {
        return { user, coach: null};
    }

    const coach: Coach = coachData;

    return { user, coach };
};

export const getCoachByFullNameAction = async (fullName: string) => {
    if (!fullName) {
        const coaches: Coach[] = []
        return { coaches };
    }

    const [supabase] = await Promise.all([createClient()]);

    const { data: coachData } = await supabase
        .from('coachesTable')
        .select()
        .ilike('fullName', `%${fullName}%`)

    if (!coachData) {
        return { coaches: [] as Coach[] };
    }

    const coaches: Coach[] = coachData;

    return { coaches };
};

export async function insertNewCoachDataAction(){
    const { userData } = await getUser();

    if(!userData){
        return { errorMessage: 'No user data!' }
    }

    const supabase = await createClient();

    const newCoach: InsertCoachType = {
        userId: userData.userId,
        coachId: AppToolkit.generateUid(userData.firstName),
        teamId: AppToolkit.generateUid(userData.lastName),
        fullName: `${userData.firstName} ${userData.lastName}`,
    }

    console.log(`Coach onboarding...`)

    const { error } = await supabase
        .from('coachesTable')
        .insert(newCoach);

    if(error){
        return { errorMessage: AppToolkit.getErrorMessage(error) }
    }

    return {errorMessage: null}
}