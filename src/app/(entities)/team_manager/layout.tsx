import {ReactNode} from "react";
import AppDock from "@/components/app-dock";
import {ChartBarBig, Home, UsersRound} from "lucide-react";
import TeamManagerProvider from "@/providers/teamManagerProvider";

const initialDockItems = [
    {
        Icon: Home,
        text: 'Home',
        url: '/team_manager'
    },
    {
        Icon: ChartBarBig,
        text: 'Leaderboard',
        url: '/team_manager/page/leaderboard'
    },
    {
        Icon: UsersRound,
        text: 'Teams',
        url: '/team_manager/page/team'
    }
]

export default function Layout({children}:{children: ReactNode}){
    return (
        <TeamManagerProvider>
            <article>
                <div className={'fixed w-full top-0 left-0 z-50 flex items-center justify-center h-[85px]'}>
                    <AppDock dockItems={initialDockItems}/>
                </div>
                <main className={'mt-[85px]'}>
                    {children}
                </main>
            </article>
        </TeamManagerProvider>
    )
}