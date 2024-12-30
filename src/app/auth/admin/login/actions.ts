'use server'
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import RoleTypes from "@/types/roleTypes";
import {getBarangay} from "@/actions/barangayActions";

export async function loginBarangayAccountAction(formData: FormData){
    const supabase = await createClient()
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signInWithPassword({email, password})

    const { barangay } = await getBarangay();

    if (error) {
        return { errorMessage: error}
    }

    if(barangay){
        redirect(`/${RoleTypes.BarangayAdmin}`)
    }

    return { errorMassage: null }
}