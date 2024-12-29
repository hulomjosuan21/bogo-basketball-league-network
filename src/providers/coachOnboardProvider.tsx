'use client'
import {ReactNode, useEffect, useTransition} from "react";
import {useRouter} from "next/navigation";
import Loading from "@/app/loading";
import useCoach from "@/hooks/use-coach";

export default function CoachOnboardProvider({children}:{children: ReactNode}) {
    const { coach, isLoading } = useCoach();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (!isLoading && !coach) {
            startTransition(() => {
                router.push('/onboard/coach');
            });
        }
    }, [coach, isLoading, router, startTransition]);

    if (isLoading) {
        return <Loading />;
    }

    if (isPending) {
        return <Loading text={'Redirecting...'}/>;
    }

    if (!coach) {
        return null;
    }

    console.log(`Player ${JSON.stringify(coach, null, 2)}`)

    return (
        <>
            {children}
        </>
    )
}