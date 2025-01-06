import {getPlayer} from "@/actions/playerActions";
import {getTeamsByPlayerId} from "@/actions/teamActions";

export default async function Page(){
    const { player } = await getPlayer();

    if(!player) {
        throw new Error("Player not found!")
    }

    const allMyTeams = await getTeamsByPlayerId(player.playerId)

    console.log(`Player tems ${JSON.stringify(allMyTeams,null,2)}`)

    return (
        <main className={'flex flex-col items-center gap-2'}>
            <div className={'w-[80%] max-w-4xl'}>
                <div className={'flex flex-col gap-4 items-center'}>
                    {
                        allMyTeams.map((team,index) => (
                            <div key={index} className={'p-2 rounded-md bg-secondary'}>{team.teamName}</div>
                        ))
                    }
                </div>
            </div>
        </main>
    )
}