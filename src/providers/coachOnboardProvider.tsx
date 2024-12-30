'use client'
import {ReactNode, useEffect, useTransition} from "react";
import {useRouter} from "next/navigation";
import Loading from "@/app/loading";
import useCoach from "@/hooks/use-coach";
import {insertNewCoachDataAction} from "@/actions/coachActions";
import useAppToast from "@/hooks/use-appToast";

export default function CoachOnboardProvider({children}:{children: ReactNode}) {
    const { coach, isLoading } = useCoach();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const { showToast } = useAppToast()

    useEffect(() => {
        if (!isLoading && !coach) {
            startTransition( async () => {
                const {errorMessage} = await insertNewCoachDataAction()
                if (errorMessage){
                    showToast("Coach error", errorMessage, "destructive");
                }else{
                    showToast("Coach", "Onboarded successfully", "default");
                }
            });
        }
    }, [coach, isLoading, router, startTransition]);

    if (isLoading) {
        return <Loading />;
    }

    if (isPending) {
        return <Loading text={'Getting you onboard coach!...'}/>;
    }

    return (
        <>
            {children}
        </>
    )
}