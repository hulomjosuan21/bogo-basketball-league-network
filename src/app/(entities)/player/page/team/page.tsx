import {getPlayer} from "@/actions/playerActions";
import {getTeamsByPlayerId} from "@/actions/teamActions";

export default async function Page(){
    const { player } = await getPlayer();

    if(!player) {
        throw new Error("Player not found!")
    }

    const allMyTeams = await getTeamsByPlayerId(player.playerId)

    return (
        <main>
            <p>
                {JSON.stringify(allMyTeams,null,2)}
            </p>
        </main>
    )
}