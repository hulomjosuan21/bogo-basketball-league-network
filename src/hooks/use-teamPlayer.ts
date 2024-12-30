import Team from "@/types/teamType";
import {useEffect, useState} from "react";
import {Player} from "@/types/playerType";
import {getPlayersDataByIds} from "@/actions/playerActions";

export default function useTeamPlayer(team: Team) {
    const [teamPlayers, setTeamPlayers] = useState<Player[]>([])

    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const {players} = await getPlayersDataByIds(team.playerIds);
            setTeamPlayers(players);
            setIsLoading(false)
        })();
    }, [team.playerIds]);

    return {teamPlayers,isLoading}
}