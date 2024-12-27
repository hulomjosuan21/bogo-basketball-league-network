'use client'
import {InsertUserType} from "@/db/schemas/userTable";
import {AddUserTest} from "@/actions/test";

export default function Home(){

    const handleAdd = async () => {
        const exampleUser: InsertUserType = {
            firstName: "Jane",
            lastName: "Smith",
            address: "456 Elm St",
            phoneNumber: "987-654-3210",
            dateOfBirth: new Date("1985-05-15").toDateString(),
            role: "coach",
            userId: "dasdasd",
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString(),
        };

        await AddUserTest(exampleUser);
    }

    return (
        <main>
            <button onClick={handleAdd}>Add user</button>
        </main>
    )
}