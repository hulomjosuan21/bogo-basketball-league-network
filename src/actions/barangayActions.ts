'use server'
import {createClient, getUser} from "@/utils/supabase/server";
import Barangay from "@/types/barangayType";
import {adminDataTable} from "@/db/schemas/adminDataTable";

export const getAllBarangay = async () => {
    const [{ user }, supabase] = await Promise.all([getUser(), createClient()]);

    const { data: barangayData } = await supabase.from('adminData').select();

    if (!barangayData) {
        return { user, barangays: [] as Barangay[]};
    }

    const barangays: Barangay[] = barangayData

    return { user, barangays };
};

export async function getBarangayByIdAction(id: keyof typeof adminDataTable, _id: string){
    let isLoading = true;
    const supabase = await createClient();

    const { data: barangay } = await supabase.from('adminData').select().eq(id, _id).single();

    isLoading = false;

    if(!barangay){
        return { barangay: null, isLoading };
    }

    const barangayData: Barangay = barangay;

    return { barangay: barangayData, isLoading };
}

export const getBarangayByNameAction = async (barangayName: string) => {
    if (!barangayName) {
        const barangays: Barangay[] = []
        return { barangays };
    }

    const [supabase] = await Promise.all([createClient()]);

    const { data: barangayData } = await supabase
        .from('adminData')
        .select()
        .ilike('barangayName', `%${barangayName}%`)

    if (!barangayData) {
        return { barangays: [] as Barangay[] };
    }

    const barangays: Barangay[] = barangayData;

    return { barangays: barangays };
};

export const getBarangay = async () => {
    const [{ user }, supabase] = await Promise.all([getUser(), createClient()]);

    const { data: barangayData } = await supabase
        .from('adminData')
        .select()
        .eq('userId', user?.id)
        .single();

    if (!barangayData) {
        return { user, barangay: null};
    }

    const barangay: Barangay = barangayData

    return { user, barangay };
};