'use server'
import {createClient, getUser} from "@/utils/supabase/server";
import Barangay from "@/types/barangayType";

export const getAllBarangay = async () => {
    const [{ user }, supabase] = await Promise.all([getUser(), createClient()]);

    const { data: barangayData } = await supabase.from('adminData').select();

    if (!barangayData) {
        return { user, barangays: [] as Barangay[]};
    }

    const barangays: Barangay[] = barangayData

    return { user, barangays };
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