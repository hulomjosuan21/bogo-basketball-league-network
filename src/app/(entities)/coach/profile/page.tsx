'use client'
import UserProfile from "@/components/user-profile";
import useUserData from "@/hooks/use-userData";
import Loading from "@/app/loading";

export default function Page(){
    const { userData, user, isLoading, error} = useUserData();

    if(isLoading){
        return <Loading/>
    }

    if(error){
        throw new Error(error);
    }

    if(!userData){
        throw new Error("No user data!");
    }

    if(!user){
        throw new Error("Not signed in!");
    }


    return (
        <main>
            <UserProfile userData={userData}/>
        </main>
    )
}