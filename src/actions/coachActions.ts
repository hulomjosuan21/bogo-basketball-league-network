'use server'
import {createClient, getUser} from "@/utils/supabase/server";
import Coach from "@/types/coachType";

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

    const coach: Coach = {
        ...coachData,
    };

    return { user, coach };
};