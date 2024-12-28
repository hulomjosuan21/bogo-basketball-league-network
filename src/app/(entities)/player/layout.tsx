'use client'
import {ReactNode, useEffect, useTransition} from "react";
import AppDock from "@/components/app-dock";
import {Home,UserRound,ChartBarBig} from "lucide-react";
import usePlayer from "@/hooks/use-player";
import {useRouter} from "next/navigation";
import Loading from "@/app/loading";
const initialDockItems = [
    {
        Icon: Home,
        text: 'Home',
        url: '/player'
    },
    {
        Icon: ChartBarBig,
        text: 'Leaderboard',
        url: '/player/leaderboard'
    },
    {
        Icon: UserRound,
        text: 'Profile',
        url: '/player/profile'
    }
]

export default function Layout({children}:{children: ReactNode}) {
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
        return <Loading text={'Redirecting...'}/>;
    }

    if (!player) {
        return null;
    }

    console.log(`Player ${JSON.stringify(player, null, 2)}`)

    return (
        <article>
            <div className={'fixed w-full top-0 left-0 z-50 flex items-center justify-center h-[85px]'}>
                <AppDock dockItems={initialDockItems}/>
            </div>
            <main className={'mt-[85px]'}>
                {children}
            </main>
        </article>
    )
}