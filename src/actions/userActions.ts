'use server'
import {InsertUserDataType, usersDataTable} from "@/db/schemas/userDataTable";
import {db} from "@/db/database";
import AppToolkit from "@/lib/app-toolkit";
import {eq} from "drizzle-orm";
import {createClient, getUser} from "@/utils/supabase/server";
import UserDataType from "@/types/userDataType";

export async function getAllUseDataAction(){
    const supabase = await createClient();

    const { data } = await supabase.from('usersData').select()

    if(!data){
        return { usersData: [] as UserDataType[] }
    }

    const usersData: UserDataType[] = data;

    return { usersData  }
}

export async function getUserDataWithUserAction(){
    let isLoading = true;
    const [{ user }, supabase] = await Promise.all([getUser(), createClient()]);

    if(!user){
        isLoading = false
        return { user, userData: null }

    }

    const { data } = await supabase.from('usersTable').select().eq('userId', user.id).single();

    if(!data){
        isLoading = false
        return { user, userData: null }
    }

    const userData: UserDataType = data
    isLoading = false
    return { user, userData, isLoading, role: userData.role}
}

export async function getUserDataByIdAction(userId: string){
    let isLoading = true;
    const supabase = await createClient();

    const { data } = await supabase.from('usersTable').select().eq('userId', userId).single();

    if(!data){
        isLoading = false
        return { userData: null }
    }

    const userData: UserDataType = data
    isLoading = false
    return { userData, isLoading, role: userData.role}
}

export async function insertNewUserDataAction(newUser: InsertUserDataType){
    try {
        await db.insert(usersDataTable).values(newUser);
        return { errorMessage: null }
    }catch(error){
        return { errorMessage: AppToolkit.getErrorMessage(error)}
    }
}

export async function updateUserDataAction(id: string, updatedUser: Partial<InsertUserDataType>) {
    try {
        await db.update(usersDataTable).set(updatedUser).where(eq(usersDataTable.id, id));
        return { errorMessage: null };
    } catch (error) {
        return { errorMessage: AppToolkit.getErrorMessage(error) };
    }
}

export async function deleteUserDataAction(id: string) {
    try {
        await db.delete(usersDataTable).where(eq(usersDataTable.id, id));
        return { errorMessage: null };
    } catch (error) {
        return { errorMessage: AppToolkit.getErrorMessage(error) };
    }
}