'use client'
import UserProfile from "@/components/user-profile";
import {Button} from "@/components/ui/button";
import useUserData from "@/hooks/use-userData";
import {signOutAction} from "@/actions/appActions";
import Loading from "@/app/loading";
import {useTransition} from "react";
import usePlayer from "@/hooks/use-player";

export default function Page(){
    const { userData, user, isLoading, error} = useUserData();
    const [isPending, startTransition] = useTransition()
    const { player, isLoading: playerLoading } = usePlayer();
    console.log(`Player on profile ${JSON.stringify(player,null,2)}`)

    const handleSignOut = () => {
        startTransition(async () => {
            await signOutAction('/auth/signin')
        })
    }

    if(isPending){
        return <Loading text={'Signing you out...'} height={'h-[calc(100vh-90px)]'}/>
    }

    if(isLoading){
        return <Loading height={'h-[calc(100vh-90px)]'}/>
    }

    if(error){
        throw new Error(error);
    }

    if(playerLoading){
        return <Loading text={'Getting player data...'} height={'h-[calc(100vh-90px)]'}/>
    }

    if(!player){
        throw new Error("No player data!");
    }

    if(!userData){
        throw new Error("No user data!");
    }

    if(!user){
        throw new Error("Not signed in!");
    }

    return (
        <main>
            <UserProfile userData={userData} gender={player.gender}/>

            <div className={'flex justify-center items-center flex-col gap-4 mt-4'}>
                <Button onClick={handleSignOut}>Sign out</Button>
            </div>
        </main>
    )
}