'use server'
import {createClient} from "@/utils/supabase/server";
import {InsertAdminDataType} from "@/db/schemas/adminDataTable";
import AppToolkit from "@/lib/app-toolkit";
import {insertNewAdminDataAction} from "@/actions/adminActions";

export async function createBarangayAccountAction(formData: FormData){
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const barangayName = formData.get('barangayName') as string;
    const address = formData.get('address') as string;
    const phoneNumber = formData.get('phoneNumber') as string;

    const supabase = await createClient()

    const { data: { user }, error: signupError } = await supabase.auth.signUp({
        email,
        password
    })

    if (signupError) {
        return { errorMessage: signupError}
    }

    if(user){
        const newBarangay: InsertAdminDataType= {
            address,
            phoneNumber,
            barangayName,
            userId: user.id,
            barangayId: AppToolkit.generateUid(barangayName),
        }

        const { errorMessage: adminDataError } = await insertNewAdminDataAction(newBarangay)

        if(adminDataError){
            return { errorMessage: adminDataError}
        }
    }

    return { errorMessage: null}
}