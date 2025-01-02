'use client'
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import League, {LEAGUE_STATUS} from "@/types/leagueTypes";
import AppToolkit from "@/lib/app-toolkit";
import {useDispatch} from "react-redux";
import { AppDispatch } from "@/context/store";
import {setLeagueAppState} from "@/context/slices/app-slice";
import RoleTypes from "@/types/roleTypes";
import {useRouter} from "next/navigation";
import useEntity from "@/hooks/use-entity";

type Props = {
    league: League
    role: string
}

export default function HasLeagueComponent({league,role}:Props){
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter();
    const { hasEntity, redirectToRole } = useEntity();

    const handleJoinLeague = () => {
        dispatch(setLeagueAppState(league));
        if(role === RoleTypes.Player){
            router.push(`/${role}`)
        }else if(role === RoleTypes.Coach){
            router.push(`/${role}/page/team`)
        }else {
            router.back()
        }
    }

    return (
        <div className={'flex items-center gap-4 flex-col p-4 border rounded-md'}>
            {
                hasEntity() && (
                    <Button className={'motion-preset-compress fixed bottom-2 right-2 z-50'} variant={'secondary'}
                            onClick={redirectToRole}>
                        Back
                    </Button>
                )
            }
            <div className={'flex items-center gap-2'}>
                <span className={'font-semibold text-lg'}>{league.leagueName}</span>
                <Badge variant={'outline'}>{league.status}</Badge>
            </div>

            {
                league.status === LEAGUE_STATUS.SCHEDULED && (
                    <div>
                        <span className={'text-xs font-medium'}>Starts at {AppToolkit.dateFormatter(league.startDate,false)}</span>
                    </div>
                )
            }

            <Button onClick={handleJoinLeague}>
                Join
            </Button>
        </div>
    )
}