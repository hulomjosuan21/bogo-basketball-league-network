import {getTeamsByLeagueIdAndIsAllowed} from "@/actions/teamActions";
import {getBarangay} from "@/actions/barangayActions";
import {getActiveLeagueAction} from "@/actions/leagueActions";
import {getAllMatchByIds} from "@/actions/matchActions";
import {findTeamsByLeagueId, ToMatchTeam} from "@/app/(admin)/barangayAdmin/page/match/(types)/teamType";
import TournamentBracket from "@/app/(admin)/barangayAdmin/page/match/(components)/match-component";

export default async function Page(){
    const { barangay } = await getBarangay();

    if(!barangay){
        throw new Error('Barangay not found')!
    }

    const { activeLeague } = await getActiveLeagueAction(barangay);

    if(!activeLeague){
        return (
            <div className={'h-[calc(100vh-80px)] grid place-items-center'}>No active League</div>
        )
    }

    const [{ matches },{ teams }] = await Promise.all([
        getAllMatchByIds('leagueId', activeLeague.leagueId),
        getTeamsByLeagueIdAndIsAllowed(activeLeague.leagueId,true)
    ])

    const toMatchTeam: ToMatchTeam[] = findTeamsByLeagueId(teams, activeLeague.leagueId)

    return (
        <main>
            <TournamentBracket teams={toMatchTeam} league={activeLeague} matches={matches}/>
        </main>
    )
}