import {ReactNode} from "react";
import {ChartBarBig, Home, UserRound, UsersRound} from "lucide-react";
import AppDock from "@/components/app-dock";
import CoachOnboardProvider from "@/providers/coachOnboardProvider";

const initialDockItems = [
    {
        Icon: Home,
        text: 'Home',
        url: '/coach'
    },
    {
        Icon: ChartBarBig,
        text: 'Leaderboard',
        url: '/coach/page/leaderboard'
    },
    {
        Icon: UsersRound,
        text: 'Team',
        url: '/coach/page/team'
    },
    {
        Icon: UserRound,
        text: 'Profile',
        url: '/coach/page/profile'
    }
]

export default function Layout({children}:{children: ReactNode}) {
    return (
        <CoachOnboardProvider>
            <article>
                <div className={'fixed w-full top-0 left-0 z-50 flex items-center justify-center h-[85px]'}>
                    <AppDock dockItems={initialDockItems}/>
                </div>
                <main className={'mt-[85px]'}>
                    {children}
                </main>
            </article>
        </CoachOnboardProvider>
    )
}