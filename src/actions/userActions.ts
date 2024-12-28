'use server'
import {InsertUserDataType, SelectUserDataType, usersDataTable} from "@/db/schemas/userDataTable";
import {db} from "@/db/database";
import AppToolkit from "@/lib/app-toolkit";
import {eq} from "drizzle-orm";

export async function getAllUseDataAction(){
    try {
        return await db.select().from(usersDataTable);
    }catch {
        return [];
    }
}

export async function getUserDataByIdAction(id: string): Promise<{ user?: SelectUserDataType, errorMessage?: string }>{
    try {
        const users = await db.select().from(usersDataTable).where(eq(usersDataTable.id, id));
        if(users.length > 0){
            return { user: users[0] }
        }else{
            return { errorMessage: 'User not found' }
        }
    }catch (error){
        return { errorMessage: AppToolkit.getErrorMessage(error) }
    }
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