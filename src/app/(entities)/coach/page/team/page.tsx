import CoachCreateTeamComponent from "@/app/(entities)/coach/page/team/coachCreateTeam";
import {getAllTeamAction} from "@/actions/teamActions";
import CoachTeamTable from "@/app/(entities)/coach/page/team/coachTeamTable";

export default async function Page(){
    const teams = await getAllTeamAction(true);

    return (
        <main>
            <div className={'flex items-center flex-col gap-4'}>
                <CoachCreateTeamComponent/>
                {
                    (teams.length > 0 ) ? (
                        <CoachTeamTable teams={teams}/>
                    ) : (
                        <div>
                           No teams found
                        </div>
                    )
                }
            </div>
        </main>
    )
}