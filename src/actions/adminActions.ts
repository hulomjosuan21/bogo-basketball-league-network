'use server'
import {db} from "@/db/database";
import AppToolkit from "@/lib/app-toolkit";
import {adminDataTable, InsertAdminDataType} from "@/db/schemas/adminDataTable";

export async function insertNewAdminDataAction(newBarangay: InsertAdminDataType){
    try {
        await db.insert(adminDataTable).values(newBarangay);
        return { errorMessage: null }
    }catch(error){
        return { errorMessage: AppToolkit.getErrorMessage(error)}
    }
}