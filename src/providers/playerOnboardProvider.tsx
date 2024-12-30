'use client'
import {ReactNode, useEffect, useTransition} from "react";
import usePlayer from "@/hooks/use-player";
import {useRouter} from "next/navigation";
import Loading from "@/app/loading";

export default function PlayerOnboardProvider({children}:{children: ReactNode}) {
    const { player, isLoading } = usePlayer();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (!isLoading && !player) {
            startTransition(() => {
                router.push('/onboard/player');
            });
        }
    }, [player, isLoading, router, startTransition]);

    if (isLoading) {
        return <Loading />;
    }

    if (isPending) {
        return <Loading text={'Getting you onboard!...'}/>;
    }

    if (!player) {
        return null;
    }

    return (
        <>
            {children}
        </>
    )
}