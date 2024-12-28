'use client'
import {ReactNode, useEffect, useTransition} from "react";
import usePlayer from "@/hooks/use-player";
import {useRouter} from "next/navigation";

export default function PlayerOnboardProvider({children}:{children: ReactNode}) {
    const { player } = usePlayer();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (player === null || player === undefined) {
            startTransition(() => {
            });
        }
    }, [player, router, startTransition]);

    if (isPending) {
        return <div>Redirecting...</div>;
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