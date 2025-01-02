'use server'

import { createClient } from "@/utils/supabase/server"
import AnnouncementType from "@/types/announcementType";
import {announcementTable, InsertAnnouncementType} from "@/db/schemas/announcement";
import AppToolkit from "@/lib/app-toolkit";
import {db} from "@/db/database";
import {getBarangay} from "@/actions/barangayActions";
import {revalidatePath} from "next/cache";

export default async function getAllAnnouncementAction(barangayId?: string) {
    const supabase = await createClient()
    const query = supabase.from('announcementTable').select();

    if (barangayId) {
        query.eq('barangayId', barangayId);
    }

    const { data } = await query;

    return { announcements: data as AnnouncementType[] || [] as AnnouncementType[] };
}

export async function insertNewAnnouncementAction(formData: FormData){
    const { barangay } = await getBarangay();

    if(!barangay){
        return { errorMessage: "No Barangay found!" }
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as string;

    const newAnnouncement: InsertAnnouncementType = {
        title,
        barangayId: barangay.barangayId,
        description,
        image: image
    }

    try {
        await db.insert(announcementTable).values(newAnnouncement)
        revalidatePath('/barangayAdmin/page/announcement')
        return { errorMessage: null }
    }catch (error) {
        return { errorMessage: AppToolkit.getErrorMessage(error)}
    }
}

export async function getAnnouncementById(id:string){
    const supabase = await createClient()

    const {data, error} = await supabase.from('announcementTable').select().eq('id',id).single()

    if(!data){
        return {errorMessage: AppToolkit.getErrorMessage(error), announcement: null}
    }

    if(error){
        return {errorMessage: AppToolkit.getErrorMessage(error), announcement: data as AnnouncementType}
    }

    return { announcement: data as AnnouncementType}
}