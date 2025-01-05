import { Button } from "@/components/ui/button";
import Link from "next/link";
import TeamCard from "./(components)/teamCard";
import {getAllTeamByTeamManager} from "@/actions/teamActions";

export default async function Page(){
    const { teams } = await getAllTeamByTeamManager()

    return (
        <main className={'flex flex-col items-center'}>
            <div className="w-[80%] max-w-4xl">
                <Button asChild={true} size={'sm'}>
                    <Link href={'/team_manager/page/team/create'}>
                        New team
                    </Link>
                </Button>

                <div className={'flex flex-wrap gap-4 justify-center sm:justify-start mt-4'}>
                    {
                        teams.map((team,index) => (
                            <TeamCard key={index} team={team}/>
                        ))
                    }
                </div>
            </div>

        </main>
    )
}