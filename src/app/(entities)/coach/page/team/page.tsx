import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import CoachCreateTeamComponent from "@/app/(entities)/coach/page/team/coachCreateTeam";
import {getAllTeamAction} from "@/actions/teamActions";
import CoachTeamAction from "@/app/(entities)/coach/page/team/coachTeamAction";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import Image from 'next/image'
import AppToolkit from "@/lib/app-toolkit";

export default async function Page(){
    const teams = await getAllTeamAction(true);

    const table = (
        <div className={'border rounded-none w-full max-w-4xl sm:rounded-md'}>
            <Table>
                <TableCaption>A list of your teams.</TableCaption>
                <TableHeader>
                    <TableRow className={'bg-secondary'}>
                        <TableHead>Team name</TableHead>
                        <TableHead className={'text-end'}></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        teams.map((team,index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <div className={'flex gap-2 items-center justify-start'}>
                                        <div className="w-[50px] my-1">
                                            <AspectRatio ratio={1}>
                                                <Image src={AppToolkit.ImageWithFallBack(team.teamImage)} alt="Image"
                                                       className="rounded-md object-cover" fill={true}/>
                                            </AspectRatio>
                                        </div>
                                        {team.teamName}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <CoachTeamAction team={team} coachTeam={teams}/>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )

    return (
        <main>
            <div className={'flex items-center flex-col gap-4'}>
                <CoachCreateTeamComponent/>
                {
                    (teams.length > 0 ) ? (
                        table
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