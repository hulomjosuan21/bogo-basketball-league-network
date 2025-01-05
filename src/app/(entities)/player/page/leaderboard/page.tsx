import TeamLeaderboardComponent from "@/components/leaderboardComponent";
import {getAllTeamsAction} from "@/actions/teamActions";
import {rankTeams} from "@/utils/teamRankingMethod";

export default async function Page(){
    const { teams } = await getAllTeamsAction()

    const rankedTeams = rankTeams(teams)
    return (
        <main>
            <TeamLeaderboardComponent teams={rankedTeams}/>
        </main>
    )
}