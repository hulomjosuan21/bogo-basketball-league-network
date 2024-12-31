import {ReactNode} from "react";
import AppDock from "@/components/app-dock";
import {Home,UserRound,ChartBarBig,UsersRound} from "lucide-react";
import PlayerOnboardProvider from "@/providers/playerOnboardProvider";

const initialDockItems = [
    {
        Icon: Home,
        text: 'Home',
        url: '/player'
    },
    {
        Icon: ChartBarBig,
        text: 'Leaderboard',
        url: '/player/page/leaderboard'
    },
    {
        Icon: UsersRound,
        text: 'Teams',
        url: '/player/page/team'
    },
    {
        Icon: UserRound,
        text: 'Profile',
        url: '/player/page/profile'
    }
]

export default function Layout({children}:{children: ReactNode}) {
    return (
        <PlayerOnboardProvider>
            <article>
                <div className={'fixed w-full top-0 left-0 z-50 flex items-center justify-center h-[85px]'}>
                    <AppDock dockItems={initialDockItems}/>
                </div>
                <main className={'mt-[85px]'}>
                    {children}
                </main>
            </article>
        </PlayerOnboardProvider>
    )
}