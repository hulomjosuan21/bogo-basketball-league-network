'use server'
import {InsertUserType, usersTable} from "@/db/schemas/userTable";
import {db} from "@/db/database";

export async function AddUserTest(newUser: InsertUserType){
    try {
        await db.insert(usersTable).values(newUser);
        console.log("User added successfully");
    }catch (error){
        console.error(error);
    }
}