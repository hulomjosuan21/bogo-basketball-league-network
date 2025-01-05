import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {getBarangay} from "@/actions/barangayActions";
import {getActiveLeagueAction} from "@/actions/leagueActions";
import {getAllPlayersSubmitLeague} from "@/actions/playerActions";
import CheckPlayerButton from "@/app/(admin)/barangayAdmin/page/players/pending/actionComponent";

export default async function Page(){
    const { barangay } = await getBarangay();

    if(!barangay) {
        throw new Error('No found barangay!')
    }

    const { activeLeague } = await getActiveLeagueAction(barangay);

    if(!activeLeague){
        return (
            <div className={'h-[calc(100vh-80px)] grid place-items-center font-semibold'}>
                No active league yet!
            </div>
        )
    }

    const { players } = await getAllPlayersSubmitLeague(activeLeague.leagueId,false);

    const pendingPlayerTable = (
        <Table className={'border-b'}>
            <TableHeader>
                <TableRow className={'bg-secondary'}>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    players.map((player,index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{player.fullName}</TableCell>
                            <TableCell>
                                <div className={'flex items-center justify-end'}>
                                    <CheckPlayerButton player={player}/>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )

    return (
        <main>
            <div>
                {
                    players.length > 0 ? (
                        pendingPlayerTable
                    ): (
                        <div className={'h-[calc(100vh-100px)] grid place-items-center font-semibold'}>
                            No Player!
                        </div>
                    )
                }
            </div>
        </main>
    )
}