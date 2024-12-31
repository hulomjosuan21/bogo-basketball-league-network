'use server'
import {createClient, getUser} from "@/utils/supabase/server";
import Coach from "@/types/coachType";
import {coachesTable, InsertCoachType} from "@/db/schemas/coachDataTable";
import AppToolkit from "@/lib/app-toolkit";
import {Player} from "@/types/playerType";

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

export async function getOneCoachByIdAction(id: keyof typeof coachesTable, _id: string){
    let isLoading = true;
    const supabase = await createClient();

    const { data: coachData } = await supabase.from('coachesTable').select().eq(id, _id).single();

    isLoading = false;

    if(!coachData){
        return { coach: null, isLoading };
    }

    const coach: Coach = coachData;

    return { coach: coach, isLoading };
}

export async function getAllCoachDataAction(){
    const supabase = await createClient();
    const { data: coachesData } = await supabase.from('coachesTable').select()

    if(!coachesData){
        return { coaches: [] as Player[] }
    }

    const coaches: Coach[] = coachesData;

    return { coaches }
}

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


    const { error } = await supabase
        .from('coachesTable')
        .insert(newCoach);

    if(error){
        return { errorMessage: AppToolkit.getErrorMessage(error) }
    }

    return {errorMessage: null}
}