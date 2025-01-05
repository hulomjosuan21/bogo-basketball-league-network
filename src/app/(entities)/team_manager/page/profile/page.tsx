'use client'
import {Button} from "@/components/ui/button";
import {signOutAction} from "@/actions/appActions";
import Loading from "@/app/loading";
import {useTransition} from "react";

export default function Page(){
    const [isPending, startTransition] = useTransition()

    const handleSignOut = () => {
        startTransition(async () => {
            await signOutAction('/auth/signin')
        })
    }

    if(isPending){
        return <Loading text={'Signing you out...'} height={'h-[calc(100vh-90px)]'}/>
    }

    return (
        <main>
            <div className={'flex justify-center items-center flex-col gap-4 mt-4'}>
                <Button onClick={handleSignOut}>Sign out</Button>
            </div>
        </main>
    )
}