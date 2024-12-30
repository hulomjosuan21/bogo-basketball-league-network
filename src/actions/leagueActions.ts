'use server'


import {createClient} from "@/utils/supabase/server";
import League, {LEAGUE_STATUS} from "@/types/leagueTypes";
import Barangay from "@/types/barangayType";
import AppToolkit from "@/lib/app-toolkit";
import {InsertLeaguesTableType, leaguesTable} from "@/db/schemas/leagueDataTable";
import {getBarangay} from "@/actions/barangayActions";
import {db} from "@/db/database";
import {revalidatePath} from "next/cache";
import {eq} from "drizzle-orm";

export async function getAllLeagueAction(){
    const supabase = await createClient();

    const { data: leagues, error: dbError } = await supabase
        .from('leaguesTable')
        .select();

    if(dbError){
        return { leagues: [] as League[] }
    }

    if (!leagues) {
        return { leagues: [] as League[] }
    }

    return { leagues: leagues as League[] }
}

export async function getAllLeagueActionByCoach(passed = false,ascending = true){
    const supabase = await createClient();
    const { barangay } = await getBarangay()

    if(!barangay) {
        return { leagues: [] as League[] }
    }

    let query = supabase.from('leaguesTable').select().eq('barangayId', barangay.barangayId).order('updatedAt', {ascending});

    if (passed) {
        query = query.in('status', [LEAGUE_STATUS.CANCELED, LEAGUE_STATUS.COMPLETED]);
    }

    const { data: leagues, error: dbError } = await query;

    if(dbError){
        return { leagues: [] as League[] }
    }

    if (!leagues) {
        return { leagues: [] as League[] }
    }

    return { leagues: leagues as League[] }
}

export async function getActiveLeagueAction(barangay: Barangay){
    const supabase = await createClient();

    const { data: league, error: dbError } = await supabase
        .from('leaguesTable')
        .select()
        .eq('barangayId', barangay.barangayId)
        .in('status', [LEAGUE_STATUS.SCHEDULED, LEAGUE_STATUS.ONGOING])
        .single();

    if(dbError){
        return { activeLeague:null, errorMessage: AppToolkit.getErrorMessage(dbError) }
    }

    return { activeLeague: league as League, errorMessage: null }
}

export async function updateLeagueStatusAction(league: League, newStatus: LEAGUE_STATUS){
    try {
        await db.update(leaguesTable).set({ status: newStatus }).where(eq(leaguesTable.leagueId, league.leagueId))
        revalidatePath('/barangayAdmin/page/league')
        return { errorMessage: null }
    }catch (error){
        return { errorMessage: AppToolkit.getErrorMessage(error) }
    }
}

export async function updateLeagueAction(league: League, newData: Partial<InsertLeaguesTableType>){
    try {
        await db.update(leaguesTable).set(newData).where(eq(leaguesTable.leagueId, league.leagueId))
        revalidatePath('/barangayAdmin/page/league')
        return { errorMessage: null }
    }catch (error){
        return { errorMessage: AppToolkit.getErrorMessage(error) }
    }
}

export async function insertNewLeagueData(formData: FormData){
    const { barangay } = await getBarangay()

    if(!barangay) {
        return { errorMessage: 'Barangay not found' }
    }

    const { activeLeague } = await getActiveLeagueAction(barangay)

    if(activeLeague) {
        return { errorMessage: "Error has active league" }
    }

    const leagueName = formData.get('leagueName') as string;
    const status = LEAGUE_STATUS.SCHEDULED;
    const startDate = formData.get('startDate') as string;
    const leagueRegistrationFee = formData.get('leagueRegistrationFee') as string;

    const newLeague: InsertLeaguesTableType = {
        leagueName,
        status,
        startDate: startDate,
        leagueRegistrationFee,
        barangayId: barangay?.barangayId,
        leagueId: AppToolkit.generateUid(leagueName)
    }

    try{
        await db.insert(leaguesTable).values(newLeague)
        revalidatePath('/barangayAdmin/page/league')
        return { errorMessage: null }
    }catch (error){
        return { errorMessage: AppToolkit.getErrorMessage(error) }
    }

}