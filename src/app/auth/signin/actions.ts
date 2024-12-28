'use server'
import {createClient, getUser} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

export async function signinUserAction(formData: FormData){
    const supabase = await createClient()
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signInWithPassword({email, password})

    const {userData} = await getUser();

    if (error) {
        return { errorMessage: error}
    }

    if(userData){
        redirect(`/${userData.role}`)
    }

    return { errorMassage: null}
}