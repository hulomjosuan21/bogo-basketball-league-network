import {ReactNode} from "react";
import AppDock from "@/components/app-dock";
import {Home,UserRound,ChartBarBig} from "lucide-react";

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