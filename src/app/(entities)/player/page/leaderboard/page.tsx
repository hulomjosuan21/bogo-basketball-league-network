import TeamLeaderboardComponent from "@/components/leaderboardComponent";
import {getAllTeamsNoCoachAction} from "@/actions/teamActions";
import {rankTeams} from "@/utils/teamRankingMethod";

export default async function Page(){
    const { teams } = await getAllTeamsNoCoachAction()

    const rankedTeams = rankTeams(teams)
    return (
        <main>
            <TeamLeaderboardComponent teams={rankedTeams}/>
        </main>
    )
}