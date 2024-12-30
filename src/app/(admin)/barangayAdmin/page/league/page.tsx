import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import BarangayCreateNewLeague from "@/app/(admin)/barangayAdmin/page/league/barangayCreateNewLeague";
import BarangayActiveLeague from "@/app/(admin)/barangayAdmin/page/league/barangayActiveLeague";
import {getActiveLeagueAction, getAllLeagueActionByCoach} from "@/actions/leagueActions";
import {getBarangay} from "@/actions/barangayActions";
import {Badge} from "@/components/ui/badge";
import {LEAGUE_STATUS} from "@/types/leagueTypes";
import AppToolkit from "@/lib/app-toolkit";

export default async function Page(){
    const { barangay } = await getBarangay();
    const { leagues } = await getAllLeagueActionByCoach(true)

    if(!barangay){
        throw new Error('Barangay not found')!
    }

    const { activeLeague } = await getActiveLeagueAction(barangay)
    // const test = Array.from({length: 100})

    const passLeagueTable = (
        <Table className={'border-b'}>
            <TableCaption>A list of past leagues.</TableCaption>
            <TableHeader>
                <TableRow className={'bg-secondary'}>
                    <TableHead>League name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Registration fee</TableHead>
                    <TableHead className={'text-end'}></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    leagues.map((league,index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{index+1}. {league.leagueName}</TableCell>
                            <TableCell>
                                <Badge variant={league.status === LEAGUE_STATUS.COMPLETED ? 'default' : 'destructive'}>
                                    {league.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                ₱ {league.leagueRegistrationFee || '0'}
                            </TableCell>
                            <TableCell className={'text-end'}>
                                {AppToolkit.dateFormatter(league.updatedAt,false)}
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )



    return (
        <main>
            <div className={'p-2 sticky top-[45px] bg-background z-10 border-b'}>
                <div className={'flex items-center gap-4'}>
                    <BarangayCreateNewLeague hasActive={!!activeLeague}/>
                    {
                        activeLeague && (
                            <BarangayActiveLeague activeLeague={activeLeague}/>
                        )
                    }
                </div>
            </div>
            {
                leagues.length > 0 ? (
                    passLeagueTable
                ): (
                    <div className={'h-[50vh] grid place-items-center'}>
                        No passed league
                    </div>
                )
            }
        </main>
    )
}