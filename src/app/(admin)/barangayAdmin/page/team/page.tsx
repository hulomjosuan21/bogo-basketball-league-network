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
import {Separator} from "@/components/ui/separator";
import {ScrollArea} from "@/components/ui/scroll-area";


export default async function Page(){
    const { barangay } = await getBarangay();

    if(!barangay){
        throw new Error('Barangay not found')!
    }

    const { activeLeague } = await getActiveLeagueAction(barangay);

    const [ { teams: pendingTeams }, { teams: includedTeams } ] = await Promise.all([
        getTeamsByLeagueIdAndIsAllowed(activeLeague?.leagueId as string,false),
        getTeamsByLeagueIdAndIsAllowed(activeLeague?.leagueId as string,true)
    ])

    const table = (
        <Table className={'border-y'}>
            <TableCaption>Teams Table</TableCaption>
            <TableHeader className={'bg-secondary'}>
                <TableRow>
                    <TableHead>Team name</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">Test Team</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )

    const items = Array.from({length: 100})

    return (
        <main>

            <div className={'p-2'}>
                <Sheet>
                    <SheetTrigger asChild={true}>
                        <Button variant={'outline'}>Request</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle/>
                        </SheetHeader>


                        <div className={'mt-8'}>
                            <ScrollArea className="h-[500px] rounded-md border">
                                <div className="p-4">
                                    <h4 className="mb-4 text-sm font-medium leading-none">Pending teams</h4>
                                    {items.map((_,index) => (
                                        <div key={index} className={'mb-4 border-b'}>
                                            <div className="text-sm">
                                                {index}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {table}
        </main>
    )
}