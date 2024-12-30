'use client'
import UserProfile from "@/components/user-profile";
import useUserData from "@/hooks/use-userData";
import Loading from "@/app/loading";
import {Button} from "@/components/ui/button";
import {signOutAction} from "@/actions/appActions";
import {useTransition} from "react";
import useCoach from "@/hooks/use-coach";

export default function Page(){
    const { userData, user, isLoading, error} = useUserData();
    const [isPending, startTransition] = useTransition();
    const { coach, isLoading: coachLoading } = useCoach();

    const handleSignOut = () => {
        startTransition(async () => {
            await signOutAction('/auth/signin')
        })
    }

    if(isPending){
        return <Loading text={'Signing you out...'}/>
    }

    if(isLoading){
        return <Loading/>
    }

    if(error){
        throw new Error(error);
    }

    if(coachLoading){
        return <Loading text={'Getting coach data...'}/>
    }

    if(!coach){
        throw new Error("No coach data!");
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

            <div className={'flex justify-center items-center flex-col gap-4 mt-4'}>
                <Button onClick={handleSignOut}>Sign out</Button>
            </div>
        </main>
    )
}