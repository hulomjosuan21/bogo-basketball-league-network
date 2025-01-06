'use server'
import {db} from "@/db/database";
import AppToolkit from "@/lib/app-toolkit";
import {adminDataTable, InsertAdminDataType} from "@/db/schemas/adminDataTable";
import {eq} from "drizzle-orm";

export async function insertNewAdminDataAction(newBarangay: InsertAdminDataType){
    try {
        await db.insert(adminDataTable).values(newBarangay);
        return { errorMessage: null }
    }catch(error){
        return { errorMessage: AppToolkit.getErrorMessage(error)}
    }
}

export async function updateBarangayDataAction(toUpdateBarangay: Partial<InsertAdminDataType>){
    try {
        const { id, ...fieldsToUpdate } = toUpdateBarangay;
        await db.update(adminDataTable)
            .set(fieldsToUpdate)
            .where(eq(adminDataTable.id, id as string));
        return { errorMessage: null }
    } catch (error) {
        return { errorMessage: AppToolkit.getErrorMessage(error) }
    }
}