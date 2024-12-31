import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Button} from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {getActiveLeagueAction} from "@/actions/leagueActions";
import {getBarangay} from "@/actions/barangayActions";
import {getTeamsByLeagueIdAndIsAllowed} from "@/actions/teamActions";
import {ScrollArea} from "@/components/ui/scroll-area";
import GenerateBracketTeamAutomatically, {
    IncludeTeamActionComponent, SetBracketActionComponent,
} from "@/app/(admin)/barangayAdmin/page/team/barangayTeamAction";
import Team from "@/types/teamType";


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

    const [ { teams: pendingTeams }, { teams: includedTeams } ] = await Promise.all([
        getTeamsByLeagueIdAndIsAllowed(activeLeague?.leagueId as string,false),
        getTeamsByLeagueIdAndIsAllowed(activeLeague?.leagueId as string,true)
    ])

    const getSpecificTeamLeagueObject = (team: Team) => {
        return team.leagueIds.find(league => league.leagueId === activeLeague.leagueId);
    };

    const table = (
        <Table className={'border-y'}>
            <TableCaption>{includedTeams.length > 0 ? 'List of included teams' : 'No team included'}</TableCaption>
            <TableHeader className={'bg-secondary'}>
                <TableRow>
                    <TableHead>Team name</TableHead>
                    <TableHead>Bracket</TableHead>
                    <TableHead className={'text-end'}>Set bracket manually</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    includedTeams && includedTeams.map((team,index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{team.teamName}</TableCell>
                            <TableCell>{getSpecificTeamLeagueObject(team)?.bracket?.toUpperCase() || 'Not set'}</TableCell>
                            <TableCell>
                                <SetBracketActionComponent team={team} league={activeLeague}/>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )

    function hasLeague() {
        if(activeLeague){
            return (
                <ScrollArea className="h-[500px] rounded-md border">
                    <div className="p-4">
                        <h4 className="mb-4 text-sm font-medium leading-none">Pending teams</h4>
                        {pendingTeams.map((team,index) => (
                            <div key={index} className={'mb-4 py-1 border-b flex items-center justify-between gap-4'}>
                                <div>
                                    <span>{team.teamName}</span>
                                </div>

                                <div>
                                    <IncludeTeamActionComponent team={team} league={activeLeague}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            )
        }else{
            return (
                <div>
                    <p className={'text-center'}>No active league found</p>
                </div>
            )
        }
    }

    return (
        <main>

            <div className={'p-2 flex items-center justify-between'}>
                <Sheet>
                    <SheetTrigger asChild={true} disabled={!activeLeague}>
                        <Button variant={'outline'}>Request</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle/>
                        </SheetHeader>
                        <div className={'mt-8'}>
                            {hasLeague()}
                        </div>
                    </SheetContent>
                </Sheet>

                <GenerateBracketTeamAutomatically teams={includedTeams} currentLeague={activeLeague}/>
            </div>

            {table}
        </main>
    )
}