import Team from "@/types/teamType";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import AppToolkit from "@/lib/app-toolkit";
import { calculateWinPercentage } from "@/utils/teamRankingMethod";

type Props = {
    teams: Team[]
}

export default function TeamLeaderboardComponent({teams}:Props){

    const teamCard = (index:number,team: Partial<Team>) => {
        return(
            <div className={'bg-secondary rounded-md p-4 flex items-center justify-between border w-full'} key={index}>

                <div className={'flex items-center gap-4'}>
                    <span className={'font-semibold'}>{index + 1}</span>

                    <Avatar className={'rounded-md'}>
                        <AvatarImage src={AppToolkit.ImageWithFallBack(team.teamImage).toString()} />
                        <AvatarFallback>T</AvatarFallback>
                    </Avatar>
                    <span>{AppToolkit.TextWithFallBack(team.teamName)}</span>
                </div>

                <div className={'flex items-center gap-4'}>
                    <span>{calculateWinPercentage(team as Team)}</span>
                </div>
            </div>
        )
    }

    return (
        <section className={'flex justify-center'}>
            <div className={'w-[80%] max-w-4xl flex flex-col items-center gap-2'}>
                {
                    teams.map((team,index) => teamCard(index,team))
                }
            </div>
        </section>
    )
}