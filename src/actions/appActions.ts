import {createClient} from "@/utils/supabase/server";

export async function signOutAction(){
    const supabase = await createClient()

    const { error } = await supabase.auth.signOut()

    if (error) {
        return { errorMessage: error}
    }
    return { errorMessage: null}
}