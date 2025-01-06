'use client'
import Loading from "@/app/loading";
import useUserData from "@/hooks/use-userData";
import UserProfile from "@/components/user-profile";
import {GenderTypes} from "@/lib/utils";

export default function Page(){
    const { userData, user, isLoading, error} = useUserData();

    if(isLoading){
        return <Loading height={'h-[calc(100vh-90px)]'}/>
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
        <main className={'pb-8'}>
            <UserProfile userData={userData} gender={GenderTypes.Other}/>
        </main>
    )
}