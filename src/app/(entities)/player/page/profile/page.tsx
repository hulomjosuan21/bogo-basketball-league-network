'use client'
import UserProfile from "@/components/user-profile";
import useUserData from "@/hooks/use-userData";
import Loading from "@/app/loading";
import usePlayer from "@/hooks/use-player";

export default function Page(){
    const { userData, user, isLoading, error} = useUserData();
    const { player, isLoading: playerLoading } = usePlayer();
    console.log(`Player on profile ${JSON.stringify(player,null,2)}`)

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
        <main className={'pb-8'}>
            <UserProfile userData={userData} gender={player.gender}/>
        </main>
    )
}