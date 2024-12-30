'use server'
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import AppToolkit from "@/lib/app-toolkit";

export async function signOutAction(path = '/'): Promise<{ errorMessage: string | undefined }> {
    const supabase = await createClient()

    const { error } = await supabase.auth.signOut()

    if (error) {
        return { errorMessage: AppToolkit.getErrorMessage(error) }
    }else{
        redirect(path)
    }
}