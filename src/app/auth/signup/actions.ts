'use server'
import {createClient} from "@/utils/supabase/server";
import {InsertUserDataType} from "@/db/schemas/userDataTable";
import {insertNewUserDataAction} from "@/actions/userActions";
import RoleTypes from "@/types/roleTypes";
import AppToolkit from "@/lib/app-toolkit";
import {redirect} from "next/navigation";

export async function userSignupAction(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const userRole = formData.get('role') as RoleTypes.Player | RoleTypes.Coach;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const address = formData.get('address') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    const dateOfBirth = formData.get('dateOfBirth') as string;

    const supabase = await createClient()

    const { data: { user }, error: signupError } = await supabase.auth.signUp({
        email,
        password
    })

    if(!user){
        return { errorMessage: 'Failed to signup user'}
    }

    if (signupError) {
        return { errorMessage: AppToolkit.getErrorMessage(signupError) }
    }

    if(user){
        const newUser: InsertUserDataType= {
            role: userRole,
            firstName,
            lastName,
            address,
            phoneNumber,
            dateOfBirth,
            userId: user.id,
            email,
        }
        const { errorMessage: userDataError } = await insertNewUserDataAction(newUser)

        if(userDataError){
            return { errorMessage: userDataError}
        }else{
            redirect(`/${userRole}`)
        }
    }
    return { errorMessage: null}
}