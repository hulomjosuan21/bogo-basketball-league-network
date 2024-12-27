'use server'
import {InsertUserType, SelectUserType, usersTable} from "@/db/schemas/userTable";
import {db} from "@/db/database";
import AppToolkit from "@/lib/app-toolkit";
import {eq} from "drizzle-orm";

export async function getAllUserAction(){
    try {
        return await db.select().from(usersTable);
    }catch {
        return [];
    }
}

export async function getUserByIdAction(id: string): Promise<{ user?: SelectUserType, errorMessage?: string }>{
    try {
        const users = await db.select().from(usersTable).where(eq(usersTable.id, id));
        if(users.length > 0){
            return { user: users[0] }
        }else{
            return { errorMessage: 'User not found' }
        }
    }catch (error){
        return { errorMessage: AppToolkit.getErrorMessage(error) }
    }
}

export async function insertNewUserAction(newUser: InsertUserType){
    try {
        await db.insert(usersTable).values(newUser);
        return { errorMessage: null }
    }catch(error){
        return { errorMessage: AppToolkit.getErrorMessage(error)}
    }
}

export async function updateUserAction(id: string, updatedUser: Partial<InsertUserType>) {
    try {
        await db.update(usersTable).set(updatedUser).where(eq(usersTable.id, id));
        return { errorMessage: null };
    } catch (error) {
        return { errorMessage: AppToolkit.getErrorMessage(error) };
    }
}

export async function deleteUserAction(id: string) {
    try {
        await db.delete(usersTable).where(eq(usersTable.id, id));
        return { errorMessage: null };
    } catch (error) {
        return { errorMessage: AppToolkit.getErrorMessage(error) };
    }
}